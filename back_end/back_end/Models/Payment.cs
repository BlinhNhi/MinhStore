namespace back_end.Models
{
    public class Payment
    {
        public Guid Id { get; set; }
        public string NameUser { get; set; }
        public int PhoneUser { get; set; }
        public string NoteUser { get; set; }
        public int TotalAmountOfOrder { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }

        public Payment()
        {
            Id = Guid.NewGuid();
        }
    }
}
