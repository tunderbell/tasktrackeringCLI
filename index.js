const readline = require('readline');
const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

let tasks = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
    });

const loadTasks = () => {
    try {
        if (fs.existsSync(TASKS_FILE)) {
            const data = fs.readFileSync(TASKS_FILE, 'utf8');
            tasks = JSON.parse(data);
        }
    }
    catch (error) {
        console.error('Error loading tasks:', error);
    }   
};


const saveTasks = () => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2)); 
  } catch (err) {
    console.error('Error saving tasks:', err);
  }
};


const listTasks = () => {
  console.log('\n--- Your Tasks ---');
  if (tasks.length === 0) {
    console.log('No tasks found. Add one with "add <your task>".');
  } else {
    tasks.forEach((task, index) => {
      const status = task.completed ? '[x]' : '[ ]';
      // We add 1 to the index for a easily readable list
      console.log(`${index + 1}. ${status} ${task.text}`);
    });
  }
  console.log('------------------\n');
};


const addTask = (text) => {
  if (!text) {
    console.log('Error: Please provide a task description.');
    return;
  }
  tasks.push({ text: text, completed: false });
  console.log(`Added task: "${text}"`);
  saveTasks();
};


const completeTask = (index) => {
  // Convert 1-based index to 0-based for the array
  const taskIndex = index - 1;
  if (tasks[taskIndex]) {
    tasks[taskIndex].completed = true;
    console.log(`Completed task: "${tasks[taskIndex].text}"`);
    saveTasks();
  } else {
    console.log('Error: Invalid task number.');
  }
};


const deleteTask = (index) => {
  const taskIndex = index - 1;
  if (tasks[taskIndex]) {
    const deletedTask = tasks.splice(taskIndex, 1);
    console.log(`Deleted task: "${deletedTask[0].text}"`);
    saveTasks();
  } else {
    console.log('Error: Invalid task number.');
  }
};


//
const showRandomLine = () => {
  const QUOTES_FILE = path.join(__dirname, 'quotes.txt');

  try {
    const text = fs.readFileSync(QUOTES_FILE, 'utf8');
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) {
      console.log('No lines found in quotes.txt.');
    } else {
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      console.log(`\n ${randomLine}\n`);
    }
  } catch (err) {
    console.error('Error reading quotes.txt:', err.message);
  }
};

const showASCIIArt = () => {
    const ASCIIART_FILE = path.join(__dirname, 'asciiart.txt');

    try{
        const text = fs.readFileSync(ASCIIART_FILE, 'utf8');
        const lines = text.      
        split('splitArtHere')
        .map(chunk => chunk.trim())
        .filter(chunk => chunk !== '');
        if (lines.length === 0) {
      console.log('No art found in asciiart.txt.');
    } else {
      const randomArt = lines[Math.floor(Math.random() * lines.length)];
      console.log(`\n ${randomArt}\n`);
    }
  } catch (err) {
    console.error('Error reading quotes.txt:', err.message);
  }
};




// --- Main Application Logic ---


rl.on('line', (line) => {
  const [command, ...args] = line.trim().split(' ');
  const textArgument = args.join(' ');
  const numberArgument = parseInt(args[0], 10);

  switch (command) {
    case 'list':
      listTasks();
      break;
    case 'add':
      addTask(textArgument);
      break;
    case 'complete':
      completeTask(numberArgument);
      break;
    case 'delete':
      deleteTask(numberArgument);
      break;
    case 'ascii':
        showASCIIArt();
      break;
    case 'inspire':
        showRandomLine();
        break;
    case 'help':
      console.log('\nAvailable Commands:\n' +
        '  list          - Show all tasks\n' +
        '  add <task>    - Add a new task\n' +
        '  complete <n>  - Mark task number <n> as complete\n' +
        '  delete <n>    - Delete task number <n>\n' +
        '  exit          - Close the application\n');
      break;
    case 'exit':
      rl.close();
      break;
    default:
      console.log(`Unknown command: "${command}". Type "help" for a list of commands.`);
      break;
  }
  // Re-display the prompt for the next command
  rl.prompt();
});

// Handle the 'close' event to give a farewell message
rl.on('close', () => {
  console.log('\nAight bro pack it in mate');
  process.exit(0);
});

// --- Application Start ---
console.clear(); // Clear the console for a clean start
console.log('Just put the fries in the bag');
console.log('Type "help" for a list of commands.');

// Load existing tasks from the file system
loadTasks();

// Display tasks and the initial prompt
listTasks();
rl.prompt();
