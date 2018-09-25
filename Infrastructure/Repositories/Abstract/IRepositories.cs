using WebDictionary.Entities;

namespace WebDictionary.Infrastructure.Repositories
{
    public interface ILoggingRepository : IEntityBaseRepository<Error> { }

    public interface IWordsRepository : IEntityBaseRepository<Word> { }
}
