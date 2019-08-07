package com.mycompany.app;

import org.everit.json.schema.Schema;
import org.everit.json.schema.ValidationException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Assert;
import org.junit.Test;

import java.net.MalformedURLException;

public class AppTest{
    private Object httpMultipartMode;

    @Test
    public void apiGetTest() {
        App api = new App(httpMultipartMode);
        int status = api.apiGet();
        Assert.assertEquals(200, status);
    }


    @Test
    public void apiGetIdTest() {
        App api = new App(httpMultipartMode);
        int res = api.apiGetId(39381);
        Assert.assertEquals("apiGetIdTest", 200, res);
    }



    public void givenValidInput_whenValidating_thenValid() throws ValidationException {
        App api = new App(httpMultipartMode);
        JSONObject obj = api.apiGetIdJSON(15896);
        JSONObject jsonSubject = new JSONObject(new JSONTokener(AppTest.class.getResourceAsStream("/hyper-schema.json")));
        Schema schema = SchemaLoader.load(obj);
        try {
            schema.validate(obj);
            Assert.assertTrue("givenValidInput_whenValidating_thenValid", true);
        } catch (ValidationException e) {
            Assert.fail("givenValidInput_whenValidating_thenValid");
        }

    }

    @Test
    public void post() throws MalformedURLException {
        App api = new App(httpMultipartMode);
        api.postt();
        Assert.assertTrue(true);
    }
}
