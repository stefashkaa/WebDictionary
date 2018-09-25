namespace WebDictionary.Infrastructure.Core
{
    public class CodeResultStatus
    {
        private readonly int status;
        private readonly string message;

        public int Status {
            get
            {
                return status;
            }
            private set { }
        }

        public string Message
        {
            get
            {
                return message;
            }
            private set { }
        }

        public CodeResultStatus(int status)
        {
            if (status == 401)
                message = "Unauthorized access. Login required";

            this.status = status;
        }

        public CodeResultStatus(int code, string message)
        {
            status = code;
            this.message = message;
        }
    }
}
