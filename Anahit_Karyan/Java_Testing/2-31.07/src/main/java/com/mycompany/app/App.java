package com.mycompany.app;

import java.io.*;
import java.util.*; 

public class App {
	public static boolean checkBrackets(String string) {
	    int count = 0;
	    char stack[];
	    char[] str = string.toCharArray();
	    for(char output : str) {
	        if(output == '(') {
	            count++;
	        } else if(output == ')') {  
	            if(count == 0) {
	                return false;
	            } else {
	                count--; 
	            }             
	        }
	    }
	    return count == 0;   
    }

    public static int resultReceipt(String equation) { 

	    Stack<String> operationStack = new Stack<String>();
	    Queue<String> numbersQ = new LinkedList<>();
	    Stack<String> stackOutput = new Stack<String>();
	    
	    char[] prioritet = {'+', '-', '*', '/'};   
	
	    for(int i = 0; i < equation.length(); ++i) { 
	        if(Character.isDigit(equation.charAt(i))){   
	            int number = Character.getNumericValue(equation.charAt(i));

	            while(i + 1 != equation.length() && Character.isDigit(equation.charAt(i + 1))){ 
	                number = number * 10 + Character.getNumericValue(equation.charAt(i + 1));
	            	i++;
	            }
	        	numbersQ.add(Integer.toString(number)); 
	        } else {
	            if(operationStack.isEmpty()) {
	                operationStack.push(String.valueOf(equation.charAt(i))); 
	            } else {
	                String lastOperation = operationStack.pop();        
	                if(new String(prioritet).indexOf(equation.charAt(i)) >= new String(prioritet).indexOf(lastOperation)) {
	                    operationStack.push(lastOperation); 
	                    operationStack.push(String.valueOf(equation.charAt(i)));
	                } else {

	                    while(new String(prioritet).indexOf(equation.charAt(i)) < new String(prioritet).indexOf(lastOperation)) {
	                        numbersQ.add(lastOperation);
	                        lastOperation = operationStack.pop();                       
	                    }
	                    operationStack.push(lastOperation);
	                    operationStack.push(String.valueOf(equation.charAt(i))); 
	                }   
	            }
	        }
	    }
	   
	    while(!operationStack.isEmpty()) {
	        numbersQ.add(operationStack.pop());         
	    }      

	    while(!numbersQ.isEmpty()){
	        String lastNumberQ = numbersQ.poll(); 
	        if(lastNumberQ.matches("-?\\d+(\\.\\d+)?")){ 
	            stackOutput.push(lastNumberQ); 
	        } else {
	            int num2 = Integer.parseInt(stackOutput.pop()); 
	            int num1 = Integer.parseInt(stackOutput.pop()); 
	            int result = 0;

	            switch(lastNumberQ) {
	            	 
	                case "+":
	                    result = num1 + num2;
	                    break;
	                case "-":
	                    result = num1 - num2;
	                    break;
	                case "*":
	                    result = num1 * num2;
	                    break;
	                case "/":
	                    if(num2 == 0) { 
	                       System.out.println("Ariphmetic exception: divide in null");
	                        return 0;
	                    } else {
	                        result = num1 / num2;
	                    }
	                    break;                            
	                default:
	                    break;
	            } 

	            stackOutput.push(Integer.toString(result)); 
	        }
	    }
	    return Integer.parseInt(stackOutput.pop());
	}

	public static int result(String str) {
	    int resultFinished;
	    int index1 = 0;
	    if(str == "") {
	    	System.out.println("String is epty");
	    	return 0;
	    }
	    while(str.indexOf(')') != -1) { 
	        int index2 = str.indexOf(')');
	        for(int i = index2; i > 0; --i) {
	                if(str.charAt(i) == '(') {
	                    index1 = i;
	                    break;
	                }
	        }
	        String bracketsContent = str.substring(index1 + 1, index2); 
	        String content = "(";
	        content = content + bracketsContent +')';
	        str = str.replace(content, String.valueOf(resultReceipt(bracketsContent)));      
	    }
	    resultFinished = resultReceipt(str);
	    return resultFinished;
	}

	public static void main(String[] args) throws Exception {
 
        /*FileReader fr = new FileReader("file.txt");
        Scanner scan = new Scanner(fr);
 		String str = "" ;
 	
        while (scan.hasNextLine()) {
            str += scan.nextLine();
        }

        fr.close();
        System.out.println(str);
        if(checkBrackets(str)) {
        	result = result(str);
        } else {
        	System.out.println("Brackets is not valid");
        }*/
        String str1 = "17+6*(2+1)";
        int result = result(str1);
        System.out.println(result);
	
	}
}
