package com.vadimli.controller;

import com.github.pagehelper.PageInfo;
import com.ramostear.captcha.HappyCaptcha;
import com.vadimli.common.Result;
import com.vadimli.domain.Item;
import com.vadimli.domain.User;
import com.vadimli.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    //登录方法
    @PostMapping("/login")
    public Result loginUser(@RequestBody Map<String,String> requestBody ,
                            String captcha , HttpServletRequest request ){
        //校验验证码是否正确
//        boolean rs = HappyCaptcha.verification(request, captcha, true);
        //如果验证码输入不正确
//        if(!rs){
//            //向model中加入 错误提示信息
//            //model.addAttribute("error","请输入正确的验证码");
//            //回显登录页面
//            return Result.fail();
//        }
        String username = requestBody.get("username");
        String password = requestBody.get("password");
        User user = userService.loginUser(username, password);
        if(user!=null){
            //将用户对象放入session中 ，跟踪用户的登录状态
            //request.getSession().setAttribute("user",user);
            return Result.suc(user);
        }else {
            return Result.fail();
        }
    }

    @PostMapping("/save")
    public Result insertUser(@RequestBody User user){
        return userService.insertUser(user) ? Result.suc():Result.fail();
    }

    @GetMapping("/list")
    public List<User> list(){
        return userService.selectAll();
    }

    //分页查看商品
    @GetMapping("/list/{pageNum}")
    public PageInfo<User> listByPage(@PathVariable int pageNum ) {
        //得到分页信息对象
        PageInfo<User> pageinfo = userService.selectPage(pageNum, 5);
        return pageinfo;
    }

    @DeleteMapping("/delete/{userId}")
    public Result deleteUserById(@PathVariable("userId") Integer userId){
        return userService.deleteByPrimaryKey(userId) ? Result.suc():Result.fail();
    }

    @PostMapping("/getUserByLike/{pageNum}")
    public PageInfo<User> getUserByLike(@RequestBody Map<String,String> requestBody, @PathVariable int pageNum){
        String username = requestBody.get("username");
        //得到分页信息对象
        PageInfo<User> pageinfo = userService.getUserByLike(username, pageNum, 5);
        return pageinfo;
    }

    @PutMapping("/update")
    public Result updateUser(@RequestBody User user){
        return userService.updateByPrimaryKey(user) ? Result.suc():Result.fail();
    }
}
