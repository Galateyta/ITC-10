package com.itc;

import java.io.*;
import java.util.Arrays;

public class Checker {
    public static void main(String[] args) throws IOException {
        File file = new File("/home/student/IdeaProjects/untitled/src/file.txt");
        FullCalculator calc = new FullCalculator();

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
        String result = calc.start(String.join(" ", Arrays.copyOfRange(parts, 0, parts.length - 2)));


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
    }
}