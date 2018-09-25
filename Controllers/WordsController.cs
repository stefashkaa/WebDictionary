using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebDictionary.Entities;
using WebDictionary.Infrastructure.Core;
using WebDictionary.Infrastructure.Repositories;

namespace WebDictionary.Controllers
{
    [Route("api/[controller]")]
    public class WordsController : Controller
    {
        private readonly IWordsRepository wordsRepository;

        public WordsController(IWordsRepository wordsRepository)
        {
            this.wordsRepository = wordsRepository;
        }

        [HttpPost("[action]")]
        public WordModel GetWords([FromBody] WordModel model)
        {
            var letter = model.Letter.ToLower();
            var words = new List<Word>();

            int i = 0;
            while (true)
            {
                try
                {
                    var word = wordsRepository.GetSingle(i + 1);
                    if (word.Name.ToLower().Contains(letter))
                    {
                        words.Add(word);
                    }
                    i++;
                }
                catch (Exception)
                {
                    break;
                }
            }
            model.Words = words;
            return model;
        }
    }
}
