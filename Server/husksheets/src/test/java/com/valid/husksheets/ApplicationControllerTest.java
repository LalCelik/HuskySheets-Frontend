package com.valid.husksheets;
import com.valid.husksheets.model.User;
import com.valid.husksheets.JSON.Argument;
import com.valid.husksheets.model.UserSystem;
import com.valid.husksheets.model.Sheet;
import com.valid.husksheets.JSON.Result;
import com.valid.husksheets.controller.ApplicationController;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.List;


import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApplicationControllerTest {
    ApplicationController appControl = new ApplicationController();
    Authentication authentication;

    // @Test
    // void createSheetTest() {

    //     Sheet sheet = new Sheet("NewSheet", "user4", new ArrayList<>());
    //     Argument argument = new Argument("user1", "NewSheet", 0, "Update");
    //     Result result = new Result(true, "Sheet has been created", null);

    //     assertThat(appControl.createSheet(authentication, sheet))
    //             .isEqualTo(result);
    // }
}
