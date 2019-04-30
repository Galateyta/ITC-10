from abc import ABC, abstractmethod
from datetime import datetime

class Validator(ABC):
    @abstractmethod
    def validate(self):
        pass
    
class DateTimeValidator(Validator):
    def validate(self, string, date_formats=['%Y-%m-%d', '%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M:%S', '%d.%m.%Y', '%d.%m.%Y %H:%M', '%d.%m.%Y %H:%M:%S', '%d/%m/%Y', '%d/%m/%Y %H:%M', '%d/%m/%Y %H:%M:%S']):
        for date_format in date_formats:
            try:
                datetime.strptime(string, date_format)
                return True
            except:
                pass
        else:    
            return False
    
class EMailValidator(Validator):
    def validate(self, string):
        if '@' in string:
            return True
        else:
            return False
			
class ChainValidator(Validator):
	def validate(self, string, date_formats=['%Y-%m-%d', '%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M:%S', '%d.%m.%Y', '%d.%m.%Y %H:%M', '%d.%m.%Y %H:%M:%S', '%d/%m/%Y', '%d/%m/%Y %H:%M', '%d/%m/%Y %H:%M:%S']):
		d = DateTimeValidator()
		e = EMailValidator()

		if d.validate(string, date_formats) and e.validate(string):
			return True
		else:
			return False