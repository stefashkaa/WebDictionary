using WebDictionary.Entities;

namespace WebDictionary.Infrastructure.Repositories
{
    public class WordsRepository : EntityBaseRepository<Word>, IWordsRepository
    {
        public WordsRepository(DictionaryContext context)
            : base(context)
        { }
    }
}
