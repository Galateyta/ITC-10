package com.mycompany.app;

import java.io.*;
import java.util.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class App {

    public static void main(String[] args) throws IOException {
        Calculator calculator = new Calculator();

        calculator.global(args[0]);
    }
}

class Calculator {

    private final Map<String, Integer> operators;

    public Calculator() {
        operators = new HashMap<>();
        operators.put("-", 0);
        operators.put("+", 0);
        operators.put("/", 1);
        operators.put("*", 1);
    }

    public boolean scopeChecker(String str) {
        int a = 0;
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == '(') {
                a++;
            } else if (str.charAt(i) == ')') {
                a--;
            }
            if (a < 0) {
                return false;
            }
        }
        if(a == 0){
            return true;
        }
        return false;
    }

    public boolean patternChecker(String str) {
        if (str == "") {
            return false;
        }
        Pattern pattern = Pattern.compile("[0-9\\.\\+\\-\\*\\/\\(\\)]");
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == ' ') {
                continue;
            }
            if (!(pattern.matcher(String.valueOf(str.charAt(i))).matches())) {
                return false;
            }
        }
        return true;
    }

    public double doTheShuntingYard(String expression)
            throws IllegalArgumentException, NumberFormatException, ArithmeticException {
        if (expression == null || expression.trim().length() == 0) {
            throw new IllegalArgumentException("Empty expression or null");
        }

        expression = expression.replaceAll("\\s+", "");

        expression = expression.replace("(-", "(0-");

        if (expression.startsWith("-")) {
            expression = "0" + expression;
        }
        Pattern pattern = Pattern.compile("((([0-9]*[.])?[0-9]+)|([\\+\\-\\*\\/\\(\\)]))");
        Matcher matcher = pattern.matcher(expression);

        int counter = 0;
        List<String> tokens = new ArrayList<>();
        while (matcher.find()) {
            if (matcher.start() != counter) {
                throw new IllegalArgumentException("Invalid Expression:" + expression + ". Error between " + counter + " end " + matcher.start());
            }
            tokens.add(matcher.group().trim());
            counter += tokens.get(tokens.size() - 1).length();
        }
        if (counter != expression.length()) {
            throw new IllegalArgumentException("Invalid end of expression");
        }

        Stack<String> stack = new Stack<>();
        List<String> output = new ArrayList<>();

        for (String token : tokens) {
            if (operators.containsKey(token)) {
                while (!stack.empty() && operators.containsKey(stack.peek())
                        && operators.get(token) <= operators.get(stack.peek())) {
                    output.add(stack.pop());
                }
                stack.push(token);

            } else if (token.equals("(")) {
                stack.push(token);
            } else if (token.equals(")")) {
                while (!stack.empty()) {
                    if (!stack.peek().equals("(")) {
                        output.add(stack.pop());
                    } else {
                        break;
                    }
                }
                if (!stack.empty()) {
                    stack.pop();
                }
            } else {
                output.add(token);
            }
        }
        while (!stack.empty()) {
            output.add(stack.pop());
        }

        Stack<Double> doubles = new Stack<>();
        for (String token : output) {
            if (!operators.containsKey(token) && token.matches("([0-9]*[.])?[0-9]+")) {
                try {
                    doubles.push(Double.parseDouble(token));
                } catch (NumberFormatException n) {
                    throw n;
                }
            } else {
                if (doubles.size() > 1) {
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
                        if (op1 == 0) {
                            throw new IllegalArgumentException("Division by 0");
                        }
                        doubles.push(op2 / op1);
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid string");
                    }
                }
            }
        }

        return doubles.peek();
    }

    public void global(String filename) throws IOException{
        File file = new File(filename);
        String st;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            st = br.readLine();
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
        String[] tmp = st.split("=");

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            if (! scopeChecker(tmp[0])) {
                throw new IllegalArgumentException("Invalid string");
            }
            if (! patternChecker(tmp[0])) {
                throw new IllegalArgumentException("Invalid string");
            }
            double leftResult = doTheShuntingYard(tmp[0]);
            if (tmp.length > 1) {
                double rigthResult = doTheShuntingYard(tmp[1]);
                System.out.println(rigthResult);
                if (leftResult == rigthResult) {
                    writer.write(st + " is true");
                    System.out.println(st + " is true");
                }
            } else {
                writer.write(tmp[0] + " = " + leftResult);
                System.out.println(tmp[0] + " = " + leftResult);
            }
        }
    }
}