package com.mycompany.app;

import java.io.*;
import java.util.*; 

public class App {
	public static boolean checkBraces(String string) {
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
	/*
    public static int resultReceipt(String equation) { 

	    Stack<Character> operationStack = new Stack<Character>();
	    Queue<Character> numbersQ = new LinkedList<>();
	    Stack<Character> stackOutput = new Stack<Character>();
	    
	    char[] prioritet = {'+', '-', '*', '/'};   
	    //գործողությունները լցնենք stac֊ի մեջ, իսկ թվերը Q-ի
	    for(int i = 0; i < equation.length(); ++i) { 
	        if(Character.isDigit(equation.charAt(i))){   
	            int number = Character.getNumericValue(equation.charAt(i));
	            while(i + 1 != equation.length() && Character.isDigit(equation.charAt(i + 1))){ 
	                number = number * 10 + Character.getNumericValue(equation.charAt(i + 1));
	            	i++;
	            }
	        	numbersQ.add((char)(number + '0')); 
	        } else {
	            if(operationStack.isEmpty()) {
	                operationStack.push(equation.charAt(i)); 
	            } else {
	                char lastOperation = operationStack.pop();        
	                if(new String(prioritet).indexOf(equation.charAt(i)) >= new String(prioritet).indexOf(lastOperation)) {
	                    operationStack.push(lastOperation); 
	                    operationStack.push(equation.charAt(i));
	                } else {
	                    while(new String(prioritet).indexOf(equation.charAt(i)) < new String(prioritet).indexOf(lastOperation)) {
	                        numbersQ.add(lastOperation);
	                        lastOperation = operationStack.pop();                       
	                    }
	                    operationStack.push(lastOperation);
	                    operationStack.push(equation.charAt(i)); 
	                }   
	            }
	        }
	    }
	   
	    //stac֊ի պարունակությունը ավելացնենք Q-ի մեջ
	    while(!operationStack.isEmpty()) {
	        numbersQ.add(operationStack.pop());         
	    }      
	    //Q-ից հերթով հանում ենք նայում եթե թիվա գցում նոր stac֊ի mեջ,եթե գործողությունա էդ stec֊ի վերջին 2 թվերը հանում ենք իրանց վրա կիրառում էդ գործողութունը
	    while(!numbersQ.isEmpty()){

	        Character lastNumberQ = numbersQ.poll(); 
	        System.out.println("sssss    " + lastNumberQ);
	        if(Character.isDigit(lastNumberQ)) { 
	            stackOutput.push(lastNumberQ); 
	        } else {
	            int num2 = Character.getNumericValue(stackOutput.pop()); 
	            int num1 = Character.getNumericValue(stackOutput.pop()); 
	            int result = 0;
	            switch(lastNumberQ) {
	            	 
	                case '+':
	                	            System.out.println("2");

	                    result = num1 + num2;
	                    break;
	                case '-':
	                	            System.out.println("3");

	                    result = num1 - num2;
	                    break;
	                case '*':
	                	            System.out.println("4");

	                    result = num1 * num2;
	                    break;
	                case '/':
	                	            System.out.println("5");

	                    if(num2 == 0) { 
	                       System.out.println("Ariphmetic exception: divide in null");
	                        return 0;
	                    } else {
	                        result = num1 / num2;
	                    }
	                    break;                            
	                default:
	                	            System.out.println("6");

	                    break;
	            } 
	             System.out.println((char)(result + '0'));
	            stackOutput.push((char)(result + '0')); 
	        }
	    }
	    return Character.getNumericValue(stackOutput.pop());
	}

	
	//փակագծի մեջի գրածը փոխումա տեղը դնում հաշված արժեքը
	public static int result(String str) {
	    int resultFinished;
	    int index1 = 0;
	    //քանի դոռ կա փակագիծ գտնւմ ենք ամենավերջի փակվողը,իրա բացվողը ու իրա պարունակության համար արժեք հաշվող ֆունկցիան կանչում վերադարցրածը դնում իրա տեղը
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
	        str = str.replaceAll(content, String.valueOf(resultReceipt(bracketsContent)));      
	    }
	    resultFinished = resultReceipt(str);
	    return resultFinished;
	}
*/



	public static void main(String[] args) throws Exception {
 
       /* FileReader fr = new FileReader("file.txt");
        Scanner scan = new Scanner(fr);
 		String str = "" ;
 		String str1 ="7+6*2";
        
        while (scan.hasNextLine()) {
            str += scan.nextLine();
        }
        fr.close();
		System.out.println(str);*/
		
		String str1 ="7+(6*2)";
        System.out.println(checkBraces(str1));


       // System.out.println(resultReceipt(str1));
        // result(str1);

	}
}
