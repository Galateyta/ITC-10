import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class Calculator {

    private final Map<String, Integer> operators;

    public Calculator(){
        operators = new HashMap<>();
        operators.put("-", 0);
        operators.put("+", 0);
        operators.put("/", 1);
        operators.put("*", 1);
    }

    public double doTheShuntingYard(String expression)throws IllegalArgumentException, NumberFormatException, ArithmeticException{
        if(expression == null || expression.trim().length() == 0)
            throw new IllegalArgumentException("Empty expression or null");

        expression = expression.replaceAll("\\s+","");

        expression = expression.replace("(-", "(0-");

        if (expression.startsWith("-")){
            expression = "0" + expression;
        }
        Pattern pattern = Pattern.compile("((([0-9]*[.])?[0-9]+)|([\\+\\-\\*\\/\\(\\)]))");
        Matcher matcher = pattern.matcher(expression);

        int counter = 0;
        List<String> tokens = new ArrayList<>();
        while(matcher.find()){
            if(matcher.start() != counter){
                throw new IllegalArgumentException("Invalid Expression:" + expression + ". Error between " + counter+ " end " + matcher.start());
            }
            tokens.add(matcher.group().trim());
            counter += tokens.get(tokens.size() - 1 ).length();
        }
        if(counter != expression.length()){
            throw new IllegalArgumentException("Invalid end of expression");
        }


        Stack<String> stack = new Stack<>();
        List<String> output = new ArrayList<>();

        for(String token : tokens){
            if(operators.containsKey(token)){
                while(!stack.empty() &&
                        operators.containsKey(stack.peek()) &&
                        operators.get(token) <= operators.get(stack.peek())){
                    output.add(stack.pop());
                }
                stack.push(token);

            }
            else if(token.equals("(")){
                stack.push(token);
            }
            else if(token.equals(")")){
                while(!stack.empty()){
                    if(!stack.peek().equals("(")){
                        output.add(stack.pop());
                    }
                    else{
                        break;
                    }
                }
                if(!stack.empty()){
                    stack.pop();
                }
            }
            else{
                output.add(token);
            }
        }
        while(!stack.empty()){
            output.add(stack.pop());
        }

        Stack<Double> doubles = new Stack<>();
        for(String token : output){
            if(!operators.containsKey(token) && token.matches("([0-9]*[.])?[0-9]+")){
                try{
                    doubles.push(Double.parseDouble(token));
                }
                catch(NumberFormatException n){
                    throw n;
                }
            }
            else{
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
                        case "^":
                            doubles.push(Math.pow(op2, op1));
                            break;
                        default:
                            throw new IllegalArgumentException(token + " is not an operator or is not handled");
                    }
                }
            }
        }

        return doubles.peek();
    }
}
