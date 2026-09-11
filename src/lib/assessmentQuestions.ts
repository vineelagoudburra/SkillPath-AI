import { AssessmentQuestion } from './types';

export const SKILL_ASSESSMENTS: Record<string, AssessmentQuestion[]> = {
  Python: [
    {
      id: 'py-1',
      skill_name: 'Python',
      type: 'conceptual',
      question: 'What is the fundamental architectural difference between a Python list and a tuple?',
      options: [
        'Lists are mutable and dynamically sized, while tuples are immutable fixed-size sequences with lower memory overhead.',
        'Lists only store homogeneous data types, whereas tuples can store mixed types.',
        'Tuples cannot be indexed or sliced, whereas lists support random access.',
        'Lists use hash tables internally, while tuples use linked lists.'
      ],
      correct_option_index: 0,
      explanation: 'Lists are mutable (can be appended, resized, changed in-place), while tuples are immutable. Because of immutability, tuples have smaller memory footprints and can be used as dictionary keys when hashable.',
      category_tested: 'Concepts'
    },
    {
      id: 'py-2',
      skill_name: 'Python',
      type: 'code_reading',
      question: 'Given the expression `numbers[::-1]`, what does this slicing operation accomplish in Python?',
      code_snippet: 'numbers = [10, 20, 30, 40, 50]\nresult = numbers[::-1]',
      options: [
        'Returns a copy of the list in reversed order with a step of -1 without mutating the original list.',
        'Reverses the original list in-place and returns None.',
        'Extracts only the odd-indexed elements starting from the end.',
        'Raises a ValueError because negative step requires explicit start and stop indices.'
      ],
      correct_option_index: 0,
      explanation: 'Slicing `[start:stop:step]` with step `-1` traverses the sequence backwards from end to start, creating a new reversed shallow copy without altering the original list.',
      category_tested: 'Coding'
    },
    {
      id: 'py-3',
      skill_name: 'Python',
      type: 'debugging',
      question: 'What bug occurs in the following function when called multiple times, and how should it be corrected?',
      code_snippet: 'def append_item(val, items=[]):\n    items.append(val)\n    return items',
      options: [
        'The default list is instantiated once at function definition time, so all calls share the same mutable accumulator list across invocations.',
        'Python raises a TypeError because default arguments cannot be collection types.',
        'The list is cleared automatically after the return statement.',
        'The items argument gets overwritten by the return value on every second invocation.'
      ],
      correct_option_index: 0,
      explanation: 'Default argument expressions in Python are evaluated once when the function is defined, not when called. Using a mutable default like `items=[]` causes shared persistent state. The fix is `items=None` and `if items is None: items = []`.',
      category_tested: 'Problem Solving'
    },
    {
      id: 'py-4',
      skill_name: 'Python',
      type: 'practical_reasoning',
      question: 'How should you remove duplicate elements from a list `[4, 2, 4, 5, 2, 3]` while preserving the original order of first appearance?',
      options: [
        'Use `list(dict.fromkeys(items))` which retains insertion order in modern Python 3.7+.',
        'Use `list(set(items))` directly.',
        'Sort the list with `sorted()` and remove adjacent identical elements.',
        'Tuples automatically remove duplicates, so convert with `tuple(items)`.'
      ],
      correct_option_index: 0,
      explanation: 'While `set()` removes duplicates, it does not guarantee element ordering. Since Python 3.7+, standard dictionaries preserve insertion order, making `list(dict.fromkeys(items))` the most idiomatic O(N) order-preserving deduplication method.',
      category_tested: 'Concepts'
    },
    {
      id: 'py-5',
      skill_name: 'Python',
      type: 'practical_reasoning',
      question: 'How would you process a 10 GB CSV file on a machine with only 2 GB of RAM without causing an Out-Of-Memory (OOM) error?',
      code_snippet: '# Efficient streaming / generator approach',
      options: [
        'Read the file iteratively line-by-line using a generator or `csv.reader`, or use `pandas.read_csv(chunksize=10000)` to stream batches into memory.',
        'Use `f.readlines()` to buffer all lines into a memory array.',
        'Increase the Python recursion limit using `sys.setrecursionlimit()`.',
        'Load the entire file into a Python string and split by newline characters.'
      ],
      correct_option_index: 0,
      explanation: 'Streaming iterators and chunked processing read only one chunk or line into memory at any given time, avoiding reading the entire 10 GB payload into RAM.',
      category_tested: 'Explanation'
    }
  ],
  'REST APIs & Web Services': [
    {
      id: 'rest-1',
      skill_name: 'REST APIs & Web Services',
      type: 'conceptual',
      question: 'Which HTTP method should be used to update an existing user resource partially (e.g. only modifying their email address)?',
      options: [
        'PATCH - intended for partial resource updates.',
        'PUT - always required for any update operation.',
        'POST - standard for modifying existing database rows.',
        'UPDATE - standard HTTP verb for record mutations.'
      ],
      correct_option_index: 0,
      explanation: 'In REST guidelines (RFC 5789), PATCH is designed for partial resource modifications. PUT is intended to replace the entire target resource with the submitted payload.',
      category_tested: 'Concepts'
    },
    {
      id: 'rest-2',
      skill_name: 'REST APIs & Web Services',
      type: 'conceptual',
      question: 'What HTTP status code should a server return when a client request successfully creates a new resource?',
      options: [
        '201 Created (often accompanied by a Location header)',
        '200 OK without headers',
        '204 No Content',
        '302 Found Redirect'
      ],
      correct_option_index: 0,
      explanation: '201 Created indicates the request has succeeded and led to the creation of one or more new resources, typically with a Location header pointing to the new resource.',
      category_tested: 'Concepts'
    },
    {
      id: 'rest-3',
      skill_name: 'REST APIs & Web Services',
      type: 'debugging',
      question: 'A client receives a `401 Unauthorized` error when attempting to fetch `/api/v1/students`. What is the most likely root cause?',
      options: [
        'The request lacked valid authentication credentials (e.g. missing or expired JWT Bearer token in the Authorization header).',
        'The database server crashed.',
        'The resource does not exist on the server.',
        'The client sent invalid JSON syntax.'
      ],
      correct_option_index: 0,
      explanation: 'HTTP 401 Unauthorized indicates the request has not been applied because it lacks valid authentication credentials for the target resource.',
      category_tested: 'Problem Solving'
    },
    {
      id: 'rest-4',
      skill_name: 'REST APIs & Web Services',
      type: 'practical_reasoning',
      question: 'Why is idempotency a critical property in REST API design for financial payment endpoints?',
      options: [
        'It guarantees that duplicate network retries or double-clicks do not accidentally charge the customer multiple times.',
        'It automatically compresses JSON payloads over HTTPS.',
        'It prevents SQL injection vulnerabilities in backend ORM queries.',
        'It forces all client requests to use the GET method.'
      ],
      correct_option_index: 0,
      explanation: 'An idempotent operation produces the same resulting server state whether called once or ten times. In payments, idempotency keys ensure network retries do not create duplicate charges.',
      category_tested: 'Explanation'
    },
    {
      id: 'rest-5',
      skill_name: 'REST APIs & Web Services',
      type: 'code_reading',
      question: 'In a REST API URL structure, which pattern follows clean RESTful resource-naming conventions?',
      options: [
        'GET /api/v1/students/42/courses (using plural nouns and hierarchy)',
        'GET /api/v1/getStudentCourses?studentId=42 (using verbs in paths)',
        'POST /api/v1/delete_student_by_id_42 (using verbs in POST action)',
        'GET /api/v1/studentList/fetchCourses/42'
      ],
      correct_option_index: 0,
      explanation: 'REST resource naming emphasizes nouns in plural form indicating collections and hierarchy (`/students/{id}/courses`) rather than action verbs in the path.',
      category_tested: 'Coding'
    }
  ],
  'SQL & Database Design': [
    {
      id: 'sql-1',
      skill_name: 'SQL & Database Design',
      type: 'conceptual',
      question: 'What is the primary difference between a LEFT OUTER JOIN and an INNER JOIN?',
      options: [
        'LEFT JOIN returns all records from the left table and matched records from the right (with NULLs for non-matches), while INNER JOIN returns only records where matches exist in both tables.',
        'INNER JOIN runs faster only when the right table has zero rows.',
        'LEFT JOIN automatically removes duplicate rows.',
        'INNER JOIN ignores primary keys.'
      ],
      correct_option_index: 0,
      explanation: 'An INNER JOIN selects records that have matching values in both tables. A LEFT JOIN returns all rows from the left table, even if there are no matches in the right table.',
      category_tested: 'Concepts'
    },
    {
      id: 'sql-2',
      skill_name: 'SQL & Database Design',
      type: 'code_reading',
      question: 'Why does using parameterized queries or prepared statements prevent SQL injection attacks?',
      options: [
        'Parameters are treated strictly as literal data values by the database engine, never as executable SQL commands.',
        'Parameterized queries encrypt the database tables on disk.',
        'It automatically adds a firewall to the database port.',
        'It converts all string inputs into numeric integers.'
      ],
      correct_option_index: 0,
      explanation: 'In parameterized queries, the database engine compiles the SQL command structure first. When parameters are bound later, they are treated purely as data literals, neutralizing any embedded SQL syntax.',
      category_tested: 'Coding'
    },
    {
      id: 'sql-3',
      skill_name: 'SQL & Database Design',
      type: 'practical_reasoning',
      question: 'What does the ACID property "Isolation" guarantee in a relational database management system?',
      options: [
        'Concurrent transactions execute without interfering with each other, preventing dirty reads and race conditions.',
        'Data is stored isolated on a physically disconnected hard drive.',
        'All queries are converted into JSON documents.',
        'No foreign keys are allowed across different database schemas.'
      ],
      correct_option_index: 0,
      explanation: 'Isolation ensures that concurrent transactions occur in isolation from each other, preventing partial or inconsistent states from being observed until transactions are committed.',
      category_tested: 'Concepts'
    },
    {
      id: 'sql-4',
      skill_name: 'SQL & Database Design',
      type: 'debugging',
      question: 'An application queries `SELECT * FROM orders WHERE customer_id = 942 ORDER BY order_date DESC`. It is slow on 10 million rows. What index would optimize it?',
      options: [
        'A composite B-Tree index on `(customer_id, order_date DESC)`.',
        'A unique index on only `order_date`.',
        'Dropping the primary key on the orders table.',
        'An index on all columns of the orders table simultaneously.'
      ],
      correct_option_index: 0,
      explanation: 'A composite index on `(customer_id, order_date DESC)` allows the database engine to quickly filter by customer_id and simultaneously read matching rows in the desired sort order without an expensive in-memory filesort.',
      category_tested: 'Problem Solving'
    },
    {
      id: 'sql-5',
      skill_name: 'SQL & Database Design',
      type: 'practical_reasoning',
      question: 'What is the "N+1 Query Problem" frequently encountered when using Object-Relational Mappers (ORMs)?',
      options: [
        'The ORM executes 1 query to fetch a list of parent records, followed by N separate queries to fetch related child records for each parent.',
        'The query returns N+1 extra columns that were not requested.',
        'The database crashes whenever N users connect simultaneously.',
        'The database creates N+1 duplicate rows on insertion.'
      ],
      correct_option_index: 0,
      explanation: 'The N+1 problem occurs when an ORM issues one initial query for a parent collection and then fires an additional query for each individual row to load child relationships, resulting in 1+N database round trips instead of an efficient JOIN.',
      category_tested: 'Explanation'
    }
  ]
};
