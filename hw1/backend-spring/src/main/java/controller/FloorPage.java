package controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FloorPage {

    @GetMapping("/floor/{id:\\d+}")
    @ResponseBody
    public String floor(Model model, @PathVariable String id) {
        return "Response!";
    }

}

