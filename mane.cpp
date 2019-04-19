

int main()
{
        http_client client(NetworkUtils::hostURI("http://host_auto_ip4:6508/v1/mafclub/api"));
        uri_builder test(U("/ServiceTest"));
        uri_builder registr(U("/insert/registration"));
        uri_builder signIn(U("/account/signIn"));
        uri_builder signOut(U("/account/signOut?clientId=u1"));
        uri_builder getUserInfo(U("/account/getUserInfo?clientId=u1"));
        uri_builder getUserShortInfo(U("/account/getUserShortInfo?clientId=u1&userId=u2"));
        uri_builder deleteUser(U("/account/deleteUser?clientId=u1"));
        uri_builder creatGroup(U("/account/creatGroup"));
        uri_builder deleteGroup(U("/account/deleteGroup?clientId=u1&groupId=g1"));
        uri_builder getGroupInfo(U("/account/getGroupInfo?clientId=u1&groupId=g1"));

        uri_builder updateGroupInfo(U("/account/updateGroupInfo?clientId=u1"));
        uri_builder groupRemoveUser(U("/account/groupRemoveUser"));
        uri_builder updateUserInfo(U("/account/updateUserInfo?clientId=u1"));

        json::value regReq;
        regReq["firstname"] = json::value::string("Valod");
        regReq["lastname"] = json::value::string("Valodyan");
        regReq["gender"] = json::value::string("male");
        regReq["email"] = json::value::string("v.valodyan@mail.ru");
        regReq["birthdate"] = json::value::string("12.12.1990");
        regReq["login"] = json::value::string("v.valodyan");
        regReq["password"] = json::value::string("Valodik90");

        json::value signInReq;
        signInReq["login"] = json::value::string("v.valodyan");
        signInReq["password"] = json::value::string("Valodik90");

        json::value creatGroupReq;
        creatGroupReq["groupName"] = json::value::string("Best");
        creatGroupReq["clientId"] = json::value::string("u1");
        creatGroupReq["access"] = json::value::string("public");

        json::value updateGroupInfoReq;
        updateGroupInfoReq["groupId"] = json::value::string("g1");
        updateGroupInfoReq["name"] = json::value::string("mafiaForever");
        updateGroupInfoReq["avatar"] = json::value::string("base64_string");

        json::value groupRemoveUserReq;
        groupRemoveUserReq["groupId"] = json::value::string("g1");
        groupRemoveUserReq["clientId"] = json::value::string("u1");
        groupRemoveUserReq["userId"] = json::value::string("u2");

        json::value updateUserInfoReq;
        updateUserInfoReq["firstName"] = json::value::string("Valod");
        updateUserInfoReq["lastName"] = json::value::string("Valodyan");
        updateUserInfoReq["avatar"] = json::value::string("base64_string");
        updateUserInfoReq["nickName"] = json::value::string("asenqValod");

        int count = 0;
        do{

                try {
                        ++count;
                        pplx::task<web::http::http_response> requestTask = client.request(methods::POST, registr.to_string(), regReq);
                        requestTask.then([](http_response resp){std::cout<<resp.to_string()<<std::endl;});
                        requestTask.wait();

                } catch (http_exception e) {
                        std::cerr<<e.what()<<std::endl;
                }

                try {
                        ++count;
                        pplx::task<web::http::http_response> requestTask = client.request(methods::GET, deleteUser.to_string());
                        requestTask.then([](http_response resp){std::cout<<resp.to_string()<<std::endl;});
                        requestTask.wait();

                } catch (http_exception e) {
                        std::cerr<<e.what()<<std::endl;
                }
        }
        while ( count < 1);
        return 0;
}
