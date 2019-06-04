namespace WebDictionary.Entities
{
    public class Word : IEntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Grammar { get; set;}
        public string Description { get; set; }
        public string Example { get; set; }
    }
}
