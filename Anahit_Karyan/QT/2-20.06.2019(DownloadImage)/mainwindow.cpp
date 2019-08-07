#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::MainWindow)
{
    //ui->setupUi(this);
       ui->urlField->setText("https://www.google.com/search?q=background+image&client=ubuntu&hs=e0P&channel=fs&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiA-siW3vjiAhUIw8QBHTxKBbQQ_AUIECgB&biw=959&bih=668#imgrc=CxnBq8EpOJ8yBM:");
       ui->statusLabel->setWordWrap(true);
       ui->buttonDownload->setDefault(true);
       ui->buttonCuit->setAutoDefault(false);

       progressDialog = new QProgressDialog(this);

       connect(ui->urlField, SIGNAL(textChanged(QString)),
                  this, SLOT(enableDownloadButton()));
       connect(progressDialog, SIGNAL(canceled()), this, SLOT(cancelDownload()));
}
MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::buttonDownloadClicked()
{
    manager = new QNetworkAccessManager(this);

    // get url
    url = (ui->urlField->text());

    QFileInfo fileInfo(url.path());
    QString fileName = fileInfo.fileName();

    if (fileName.isEmpty())
        fileName = "index.html";

    if (QFile::exists(fileName)) {
        if (QMessageBox::question(this, tr("HTTP"),
                tr("There already exists a file called %1 in "
                "the current directory. Overwrite?").arg(fileName),
                QMessageBox::Yes|QMessageBox::No, QMessageBox::No)
                == QMessageBox::No)
                return;
        QFile::remove(fileName);
    }

    file = new QFile(fileName);
    if (!file->open(QIODevice::WriteOnly)) {
        QMessageBox::information(this, tr("HTTP"),
                      tr("Unable to save the file %1: %2.")
                      .arg(fileName).arg(file->errorString()));
        delete file;
        file = 0;
        return;
    }

    // used for progressDialog
    // This will be set true when canceled from progress dialog
    httpRequestAborted = false;

    progressDialog->setWindowTitle(tr("HTTP"));
    progressDialog->setLabelText(tr("Downloading %1.").arg(fileName));

    // download button disabled after requesting download
    ui->buttonDownload->setEnabled((false));

    startRequest(url);
}

void MainWindow::httpReadyRead()
{
    // this slot gets called every time the QNetworkReply has new data.
    // We read all of its new data and write it into the file.
    // That way we use less RAM than when reading it at the finished()
    // signal of the QNetworkReply
    if (file)
        file->write(reply->readAll());
}

void MainWindow::updateDownloadProgress(qint32 bytesRead, qint32 totalBytes)
{
    if (httpRequestAborted)
        return;

    progressDialog->setMaximum(totalBytes);
    progressDialog->setValue(bytesRead);
}

void MainWindow::buttonQuitClicked()
{
    this->close();
}

void MainWindow::on_urlEdit_returnPressed()
{
    buttonDownloadClicked();
}

void MainWindow::enableDownloadButton()
{
    ui->buttonDownload->setEnabled(!(ui->urlField->text()).isEmpty());
}

// During the download progress, it can be canceled
void MainWindow::cancelDownload()
{
    ui->statusLabel->setText(tr("Download canceled."));
    httpRequestAborted = true;
    reply->abort();
    ui->buttonDownload->setEnabled(true);
}

// When download finished or canceled, this will be called
void MainWindow::httpDownloadFinished()
{
    // when canceled
    if (httpRequestAborted) {
        if (file) {
            file->close();
            file->remove();
            delete file;
            file = 0;
        }
        reply->deleteLater();
        progressDialog->hide();
        return;
    }

    // download finished normally
    progressDialog->hide();
    file->flush();
    file->close();

    // get redirection url
    QVariant redirectionTarget = reply->attribute(QNetworkRequest::RedirectionTargetAttribute);
    if (reply->error()) {
        file->remove();
        QMessageBox::information(this, tr("HTTP"),
                                 tr("Download failed: %1.")
                                 .arg(reply->errorString()));
        ui->buttonDownload->setEnabled(true);
    } else if (!redirectionTarget.isNull()) {
        QUrl newUrl = url.resolved(redirectionTarget.toUrl());
        if (QMessageBox::question(this, tr("HTTP"),
                                  tr("Redirect to %1 ?").arg(newUrl.toString()),
                                  QMessageBox::Yes | QMessageBox::No) == QMessageBox::Yes) {
            url = newUrl;
            reply->deleteLater();
            file->open(QIODevice::WriteOnly);
            file->resize(0);
            startRequest(url);
            return;
        }
    } else {
        QString fileName = QFileInfo(QUrl(ui->urlField->text()).path()).fileName();
        ui->statusLabel->setText(tr("Downloaded %1 to %2.").arg(fileName).arg(QDir::currentPath()));
        ui->buttonDownload->setEnabled(true);
    }

    reply->deleteLater();
    reply = 0;
    delete file;
    file = 0;
    manager = 0;
}

// This will be called when download button is clicked
void MainWindow::startRequest(QUrl url)
{
    // get() method posts a request
    // to obtain the contents of the target request
    // and returns a new QNetworkReply object
    // opened for reading which emits
    // the readyRead() signal whenever new data arrives.
    reply = manager->get(QNetworkRequest(url));

    // Whenever more data is received from the network,
    // this readyRead() signal is emitted
    connect(reply, SIGNAL(readyRead()),
            this, SLOT(httpReadyRead()));

    // Also, downloadProgress() signal is emitted when data is received
    connect(reply, SIGNAL(downloadProgress(qint32,qint32)),
            this, SLOT(updateDownloadProgress(qint32,qint32)));

    // This signal is emitted when the reply has finished processing.
    // After this signal is emitted,
    // there will be no more updates to the reply's data or metadata.
    connect(reply, SIGNAL(finished()),
            this, SLOT(httpDownloadFinished()));
}





