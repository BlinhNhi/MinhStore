﻿namespace back_end.Models
{
    public class UserLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? FullName { get; set; }
    }
}
