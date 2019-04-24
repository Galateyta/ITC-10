Welcome to Simple Validation's documentation!
=============================================

What is Simple Validator(SV)?
=================================
Simple Validator is №1 validator in the world. This tool can validate and dates and emails.

It is written in Python.

What can SV do?
=================================

* Validate dates and times
* Validate EMails addresses
* Chain validation (date+email)

DateTimeValidator
-----------------
**DateTimeValidator** takes a string and date formats(*@not required*).

Returns *True* if string is validated or *False* if it isn't.

Usage
~~~~~

First you need to create **DateTimeValidator**::

    d = DateTimeValidator()
Then use **validate** method to check validation::

	d.validate('Cow')
	>> False
	d.validate('2019-04-22')
	>> True

	d.validate('05/04 20:22', date_formats=['%d/%m %H:%M'])
	>> True


EMailValidator
-----------------
**EMailValidator** takes a string.

Returns *True* if string is validated or *False* if it isn't.

Usage
~~~~~

First you need to create **EMailValidator**::

    e = EMailValidator()
Then use **validate** method to check validation::

	e.validate('dambul')
	>> False
	e.validate('example@instigate.com')
	>> True


ChainValidator
-----------------
**ChainValidator** takes a string and date formats(*@not required*).

Returns *True* if string is validated or *False* if it isn't.

Usage
~~~~~

First you need to create **ChainValidator**::

    c = ChainValidator()
Then use **validate** method to check validation::

	c.validate('05/04 20:22', date_formats=['%d/%m %H:%M'])
	>> False
	c.validate('05/04 20:22 name@instigate.com', date_formats=['%d/%m %H:%M'])
	>> True


.. toctree::
   :maxdepth: 2
   :caption: Contents:




Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
