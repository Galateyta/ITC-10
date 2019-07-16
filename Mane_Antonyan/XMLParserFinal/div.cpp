#include "div.h"

Div::Div(QWidget *parent): QWidget(parent)
{
    mLayout = new QBoxLayout(QBoxLayout::Direction::TopToBottom, this);
}

void Div::addLayout(QBoxLayout *layout)
{
    mLayout->addLayout(layout);
}

void Div::addDiv(Div *div)
{
    mLayout->addWidget(div);
}

void Div::addWidget(QWidget *widget)
{
    mLayout->addWidget(widget);
}

void Div::setDirection(QBoxLayout::Direction direction)
{
    mLayout->setDirection(direction);
}

void Div::setAlignment(Qt::Alignment alignment)
{
    mLayout->setAlignment(alignment);
}
