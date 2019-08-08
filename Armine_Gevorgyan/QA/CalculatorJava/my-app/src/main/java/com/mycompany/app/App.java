package com.mycompany.app;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.io.*;
import java.util.*;

public class App {

    public static void main(String[] args) throws IOException {
            Calculator calculator = new Calculator();
            List list = new ArrayList();
            String curline;

            try {
                File file = new File("src/resources/file.txt");
                //open file for reading
                BufferedReader br = new BufferedReader(new FileReader(file));
                //read line on file
                curline = br.readLine();
                // split text on curline
                String[] tmp = curline.split("=");
                if (tmp.length == 2) {
                    //calculate result in left and right expression
                    double resultLeft = calculator.doTheShuntingYard(tmp[0]);
                    double resultRight = calculator.doTheShuntingYard(tmp[1]);
                    //compare left and right expression
                    if (resultLeft == resultRight) {
                        try {
                            //open file for writing
                            BufferedWriter writer = new BufferedWriter(new FileWriter(file));
                            //write in file
                            writer.write(tmp[0] + " = " + tmp[1] + " //true");
                            //close file
                            writer.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    } else {
                        try {
                            //open file for writing
                            BufferedWriter writer = new BufferedWriter(new FileWriter(file));
                            //write in file
                            writer.write(tmp[0] + " = " + tmp[1] + " //false");
                            //close file
                            writer.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                } else {
                    //calculate result for expression
                    double result = calculator.doTheShuntingYard(tmp[0]);
                    //cast double to string
                    String numberAsString = Double.toString(result);
                    try {
                        //open file for writing
                        BufferedWriter writer = new BufferedWriter(new FileWriter(file));
                        //write on file
                        writer.write(tmp[0] + " = " + result);
                        //close file
                        writer.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
		//close file
                br.close();

            } catch (IOException e) {
                System.out.println(list);
                e.printStackTrace();
            }
        }
}



class Calculator {

    private final Map<String, Integer> operators;

    public Calculator(){
        operators = new HashMap<>();
        operators.put("-", 0);
        operators.put("+", 0);
        operators.put("/", 1);
        operators.put("*", 1);
    }

    /**
     * Performs the Shunting Yard algorithm
     * @param expression the mathematical expression
     * @return the result, if found
     * @throws IllegalArgumentException invalid expression exception
     * @throws NumberFormatException error while parsing a number, probably due to an invalid expression
     * @throws ArithmeticException division by 0
     */
    public double doTheShuntingYard(String expression)throws IllegalArgumentException, NumberFormatException, ArithmeticException{
        // throw an exception if the string is null or empty
        if(expression == null || expression.trim().length() == 0)
            throw new IllegalArgumentException("Empty expression or null");

        //remove all blank spaces
        expression = expression.replaceAll("\\s+","");

        //add a 0 before the "-" in order to consider the "-" as a standalone operator
        expression = expression.replace("(-", "(0-");

        //same thing here
        if (expression.startsWith("-")){
            expression = "0" + expression;
        }

        //read the expression and check if it contains only allowed token
        Pattern pattern = Pattern.compile("((([0-9]*[.])?[0-9]+)|([\\+\\-\\*\\/\\(\\)\\^]))");
        Matcher matcher = pattern.matcher(expression);

        int counter = 0; //must be equal to the index of the end of the last matching group
        List<String> tokens = new ArrayList<>();
        while(matcher.find()){
            if(matcher.start() != counter){
                //at this point counter indicates the end of the last matching group. If the next matching group
                //doesn't start at this index, it means that some characters were skipped
                throw new IllegalArgumentException("Invalid Expression:" + expression + ". Error between " + counter+ " end " + matcher.start());
            }
            tokens.add(matcher.group().trim());//add the token if it's okay
            counter += tokens.get(tokens.size() - 1 ).length();//update the counter
        }
        if(counter != expression.length()){
            //if the matcher reaches the end of the string, we want to check if the last matching group ends at the end of the expression
            throw new IllegalArgumentException("Invalid end of expression");
        }

        //if we are here, it means that all the concatenation of all matching group = whole expression.
        // /!\ it doesn't means that the expression is valid ! For example, this string would be acepted:
        // 7/*-7, and the result would be 0

        Stack<String> stack = new Stack<>(); //operators stack
        List<String> output = new ArrayList<>(); //output queue

        //the main algorithm
        for(String token : tokens){
            //read the token. We have 4 options:
            // - it's an operator
            // - it's a (
            // - it's a )
            // - it's a number
            if(operators.containsKey(token)){
                //it's an operator.
                //We have to check:
                // - if the stack is not empty
                // - if the element on the top of the stack is an operator
                // - if the operator represented by the token has a priority less or equal than the operator
                //   represented by the element on the top of the stack, and if is left-associated
                //   OR
                //   if the operator represented by the token has a priority less than the operator represented
                //   by the element on the top of the stacke, and is right associated
                while(!stack.empty() &&
                        operators.containsKey(stack.peek())&&
                        ((operators.get(token) <= operators.get(stack.peek()) && !token.equals("^"))||
                                (operators.get(token) < operators.get(stack.peek()) && token.equals("^")))){
                    output.add(stack.pop()); //pop the element on the top of the stack and add it to the output
                }
                stack.push(token); // finally, push the token on the top of the stack

            }
            else if(token.equals("(")){
                //if its a left parenthesis, push it onto the stack. It will be removed as the associted right parenthesis will be found
                stack.push(token);
            }
            else if(token.equals(")")){
                //if it's a right parenthesis, pop the stack until a left parenthesis is found, or the the stack is empty
                while(!stack.empty()){
                    if(!stack.peek().equals("(")){
                        output.add(stack.pop());
                    }
                    else{
                        break;
                    }
                }
                if(!stack.empty()){
                    stack.pop();// finally, remove the left parenthesis
                }
            }
            else{
                output.add(token); //numbers are immediatly added to the output queue
            }
        }

        while(!stack.empty()){
            output.add(stack.pop());// while the stack is not empty, pop elements (normally there are only operators in the stack
            // at this point) and add it to the ouput queue
        }

        // Then, the output queue represents normally the RPN
        Stack<Double> doubles = new Stack<>();
        for(String token : output){
            //for each token (normally there are only numbers OR operators)

            //if the token is not an operator and is a number, try to parse it and push it onto the stack
            if(!operators.containsKey(token) && token.matches("([0-9]*[.])?[0-9]+")){
                try{
                    doubles.push(Double.parseDouble(token));
                }
                catch(NumberFormatException n){
                    throw n;
                }
            }
            else{
                // if it's an operator, get the 2 elements at the top and perform the right operation.
                // you should remind that is always op2 (operator) op1
                if(doubles.size() > 1){
                    double op1 = doubles.pop();
                    double op2 = doubles.pop();
                    switch (token) {
                        case "+":
                            doubles.push(op2 + op1);
                            break;
                        case "-":
                            doubles.push(op2 - op1);
                            break;
                        case "*":
                            doubles.push(op2 * op1);
                            break;
                        case "/":
                            if(op1 == 0){
                                throw new ArithmeticException("Division by 0");
                            }
                            doubles.push(op2 / op1);
                            break;
                        default:
                            throw new IllegalArgumentException(token + " is not an operator or is not handled");
                    }
                }
            }
        }
        //normally, it remains only one number in the stack
        if(doubles.empty() || doubles.size() > 1){
            throw new IllegalArgumentException("Invalid expression, could not find a result. An operator seems to be absent");
        }
        return doubles.peek();
    }

}
