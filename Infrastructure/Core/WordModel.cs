using System.Collections.Generic;
using WebDictionary.Entities;

namespace WebDictionary.Infrastructure.Core
{
    public class WordModel
    {
        public string Letter { get; set; }
        public IEnumerable<Word> Words { get; set; }
    }
}
