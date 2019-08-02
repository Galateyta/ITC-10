package com.mycompany.app;

import java.io.*;
import java.util.Arrays;

public class Checker {
    public static void main(String[] args) {
        String path = "src/resources/file.txt";      
        reader(path);
    }
    // the function is assigned to read the mathematical expression from the file,
    // solve this expression and write the answer in the same file

    public static int reader(String path){
        File file = new File(path);

        FullCalculator calc = new FullCalculator();
        try {
            FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);

        String line = br.readLine();
        String expect = "";
        String[] parts = line.split(" ");
        if (line.contains("=")) {
            if (parts[parts.length - 2].equals("=")) {
                expect = parts[parts.length - 1];
            }
        }
        String result = "";
        if (expect.isEmpty()){
            result = calc.start(line); 
        } else {
            result = calc.start(String.join(" ", Arrays.copyOfRange(parts, 0, parts.length - 2)));       
        } 

        if (!result.equals("error")) {
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);

            if (expect.isEmpty()) {
                line += " = " + result;
            } else {
                line += " " + result.equals(expect);
            }
            bw.write(line);

            bw.close();
            fw.close();
        }
        br.close();
        fr.close();
        return 0;
    } catch (IOException ex) {
        ex.printStackTrace();
        return 1;
        }
    }    

}

