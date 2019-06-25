#ifndef OTHERWIDGETS_H
#define OTHERWIDGETS_H

#include <QWidget>
#include <QString>

class OtherWIdgets : public QWidget
{
    Q_OBJECT
public:
    explicit OtherWIdgets(QWidget *parent = nullptr);

signals:

public slots:

private:
    QWidget* mWidget = nullptr;
};

#endif // OTHERWIDGETS_H
