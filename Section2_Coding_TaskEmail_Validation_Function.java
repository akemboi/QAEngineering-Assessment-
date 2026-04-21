java
public boolean validateEmail(String email) {
    if(email == null || email.isEmpty()){
        return false;
    }
    if(email.contains(" ")){
        return false;
    }
    if(!email.contains("@")){
        return false;
    }
    if(!email.contains(".")){
        return false;
    }
    return true;
}
