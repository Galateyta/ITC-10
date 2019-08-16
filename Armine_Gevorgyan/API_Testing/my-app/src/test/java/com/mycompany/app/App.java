package com.mycompany.app;

import org.everit.json.schema.Schema;
import org.everit.json.schema.ValidationException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Random;
import java.util.Scanner;

public class App<MultipartEntity> {
    private Object HttpMultipartMode;
    URL url = new URL("http://dummy.restapiexample.com/api/v1/employees");

    public App(Object httpMultipartMode) throws MalformedURLException {
        HttpMultipartMode = httpMultipartMode;
    }

    public int getStatusCode(HttpURLConnection conn) throws IOException {
        if (conn.getResponseCode() != 200) throw new RuntimeException(" HTTP error code : "
                + conn.getResponseCode());
        return conn.getResponseCode();
    }

    public JSONObject getBody(HttpURLConnection conn) throws IOException {
        Scanner scan = new Scanner(url.openStream());
        String entireResponse = new String();
        while (scan.hasNext())
            entireResponse += scan.nextLine();
        if (conn.getResponseCode() != 200) {
            throw new RuntimeException(" HTTP error code : "
                    + conn.getResponseCode());
        }
        if(entireResponse.length() > 1) {
            Random rand = new Random();
            int n = rand.nextInt(entireResponse.length());
            JSONArray jsnobject = new JSONArray(entireResponse);
            return (JSONObject) jsnobject.get(n);
        } else {
            return  new JSONObject(entireResponse );
        }
    }

    public HttpURLConnection  apiGet() {
        try {
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            return conn;
        } catch (ProtocolException e) {
            e.printStackTrace();
            return null;
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


    public HttpURLConnection apiGetIdJSON(int id) {
        try {
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            return conn;

        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public JSONObject postt(String obj) throws MalformedURLException {
        try {
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; utf-8");
            con.setDoOutput(true);
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = obj.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                String responseLine = null;
                StringBuilder response = new StringBuilder();
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return   new JSONObject(response.toString());
            }
        }catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean validSchema(int id) throws IOException {
        HttpURLConnection conn = apiGetIdJSON(id);
        Scanner scan = new Scanner(url.openStream());
        String entireResponse = new String();
        while (scan.hasNext())
            entireResponse += scan.nextLine();
        if (conn.getResponseCode() != 200) {
            throw new RuntimeException(" HTTP error code : "
                    + conn.getResponseCode());
        }
        JSONObject obj =  new JSONObject(entireResponse );
        Schema schema = SchemaLoader.load(obj);
        try {
            schema.validate(obj);
            return true;
        } catch (ValidationException e) {
            return false;
        }
    }
}

