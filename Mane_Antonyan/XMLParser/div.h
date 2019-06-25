#ifndef DIV_H
#define DIV_H

#include <QWidget>
#include <QBoxLayout>

class Div : public QWidget
{
    Q_OBJECT
public:
    explicit Div(QWidget *parent = nullptr);

public:
    void addLayout(QBoxLayout* layout);
    void addDiv(Div* div);
    void addWidget(QWidget* widget);

signals:

public slots:

private:
    QBoxLayout* mLayout = nullptr;
};

#endif // DIV_H
