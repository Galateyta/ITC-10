package com.mycompany.app;

import org.everit.json.schema.ValidationException;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;

public class AppTest{
    private Object httpMultipartMode;
    App api = new App(httpMultipartMode);

    public AppTest() throws MalformedURLException {
    }

    @Test
    public void apiGetStatusCodeTest() throws IOException {
        HttpURLConnection conn = api.apiGet();
        int status = api.getStatusCode(conn);
        Assert.assertEquals("apiGetStatusCode feild",200, status);
    }

    @Test
    public void apiGetBodyTest() throws IOException {
        HttpURLConnection conn = api.apiGet();
        JSONObject jsonObj = api.getBody(conn);
        int id = (int) jsonObj.get("id");
        boolean result = api.validSchema(15973);
        Assert.assertEquals("apiGetBody feild", true, result);
    }

    @Test
    public void apiGetIdTest() throws IOException {
        HttpURLConnection conn = api.apiGetIdJSON(15973);
        int status = api.getStatusCode(conn);
        Assert.assertEquals("apiGetIdTest", 200, status);
    }

   @Test
    public void validSchema() throws ValidationException, IOException {
        boolean result = api.validSchema(15973);
        Assert.assertEquals("validSchema", true, result);
    }

    @Test
    public void post() throws MalformedURLException {
        String jsonInputString = "{\"name\":\"Aaamz\",\"salary\":\"123\",\"age\":\"23\"}";
        JSONObject result = api.postt(jsonInputString);
        result.remove("id");
        Assert.assertEquals("post feild", jsonInputString, result.toString());
    }
}

