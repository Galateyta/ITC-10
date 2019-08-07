package com.mycompany.app;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

public class App<MultipartEntity> {
    private Object HttpMultipartMode;

    public App(Object httpMultipartMode) {
        HttpMultipartMode = httpMultipartMode;
    }


    public int  apiGet() {
        int status = -1;
        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/employees");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            Scanner scan = new Scanner(url.openStream());
            String entireResponse = new String();
            while (scan.hasNext())
                entireResponse += scan.nextLine();
            status = conn.getResponseCode();
            JSONObject obj = new JSONObject(entireResponse );
            if (status != 200) {
                throw new RuntimeException(" HTTP error code : "
                        + conn.getResponseCode());
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        }

        return status;
    }


    public JSONObject apiGetIdJSON(int id) {
        int status = -1;

        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/employee/" + id);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            Scanner scan = new Scanner(url.openStream());
            String entireResponse = new String();
            while (scan.hasNext())
                entireResponse += scan.nextLine();
            status = conn.getResponseCode();
            if (status != 200) {
                throw new RuntimeException(" HTTP error code : "
                        + conn.getResponseCode());
            }
            JSONObject obj = new JSONObject(entireResponse );

            return obj;
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return  null;

        } catch (IOException e) {

            e.printStackTrace();
            return null;

        }

    }

    public int apiGetId(int id) {
        int status = -1;

        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/employee/" + id);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            Scanner scan = new Scanner(url.openStream());
            String entireResponse = new String();
            while (scan.hasNext())
                entireResponse += scan.nextLine();
            status = conn.getResponseCode();
            if (status != 200) {
                throw new RuntimeException(" HTTP error code : "
                        + conn.getResponseCode());
            }
            JSONObject obj = new JSONObject(entireResponse );
            System.out.println("++++++++++++++++++++++++++++++++++++++++++++++");
            System.out.println(obj.get("id"));
            System.out.println("++++++++++++++++++++++++++++++++++++++++++++++");

            return (int) obj.get("id");
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return  -1;

        } catch (IOException e) {

            e.printStackTrace();
            return -2;

        }

    }


    public void postt() throws MalformedURLException {
        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/create");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; utf-8");
            con.setDoOutput(true);
            String jsonInputString = "{\"name\":\"Arm\",\"salary\":\"123\",\"age\":\"23\",\"id\":\"15896\"}";
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println("============================================");
                System.out.println(response.toString());
            }

            }catch (MalformedURLException e) {
            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        }
    }
}
