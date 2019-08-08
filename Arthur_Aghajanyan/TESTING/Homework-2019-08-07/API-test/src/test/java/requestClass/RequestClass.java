package requestClass;

import org.json.JSONException;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class RequestClass {
    public static JSONObject getRequest(int id) throws IOException {
        String path = "http://dummy.restapiexample.com/api/v1/employee/" + id;
            URL url = new URL(path);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("HTTP error code : "
                        + conn.getResponseCode());
            }
            Scanner scan = new Scanner(url.openStream());
            String entireResponse = new String();
            while (scan.hasNext())
                entireResponse += scan.nextLine();

            System.out.println("Response : " + entireResponse);

            scan.close();

        JSONObject obj = null;
        try {
            obj= new JSONObject(entireResponse);
        } catch (JSONException ex){
            return null;
        }
        conn.disconnect();
        return obj;
    }

    public static JSONObject updateRequestApi(int id, JSONObject putElementParametr) throws IOException {
        String path = "http://dummy.restapiexample.com/api/v1/update/" + id;
        URL url = new URL(path);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("PUT");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        OutputStreamWriter wr= new OutputStreamWriter(conn.getOutputStream());
        wr.write(putElementParametr.toString());
        wr.flush();
        if (conn.getResponseCode() != 200) {
            throw new RuntimeException("HTTP error code : "
                    + conn.getResponseCode());
        }
        String entireResponse = new String();
        try(BufferedReader br = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            entireResponse = response.toString();
            System.out.println("Response : " + response.toString());
        }

        JSONObject obj = null;
        try {
            obj= new JSONObject(entireResponse);
        } catch (JSONException ex){
            return null;
        }
        conn.disconnect();
        return obj;
    }
}
