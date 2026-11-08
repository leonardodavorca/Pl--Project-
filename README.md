# pl-

A very simple programming language for beginners. pl- has only a few words, no curly braces, and no semicolons. Every block of code ends with the word `end`.

[Open the interactive tutorial](#) · [Report an issue](#)

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Language Reference](#language-reference)
  - [Program Structure](#program-structure)
  - [Comments](#comments)
  - [Variables](#variables)
  - [Data Types](#data-types)
  - [Operators](#operators)
  - [Text](#text)
  - [Lists](#lists)
  - [Decisions](#decisions)
  - [Loops](#loops)
  - [Functions](#functions)
  - [Keyword Summary](#keyword-summary)
- [Built-in Commands](#built-in-commands)
- [Modules](#modules)
  - [game](#game)
  - [web](#web)
  - [ai](#ai)
- [Playground](#playground)
- [Example Programs](#example-programs)
- [Error Messages](#error-messages)
- [How the Translator Works](#how-the-translator-works)
- [Limitations](#limitations)
- [Tips for Beginners](#tips-for-beginners)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

pl- is designed to be read like plain instructions.

| Feature | Details |
|---|---|
| Few words | About fifteen keywords in total |
| No block symbols | No `{ }`, no `;`. Blocks end with `end` |
| One line, one job | Each line is a single instruction |
| Automatic types | No need to declare the type of a variable |
| Built-in modules | `game`, `web`, and `ai` work in the Playground |
| Browser playground | Run code with no installation |
| File extension | `.pl` |

## Quick Start

Create a file named `hello.pl`:

```text
say "Hello, World!"
```

Open the tutorial page, click **Run code** in the sidebar, paste the code, and press **Run**.

Output:

```text
Hello, World!
```

## Language Reference

### Program Structure

A pl- program is a list of lines, read from top to bottom. Each line is one instruction. Indentation is only for readability, so use four spaces inside blocks to keep code tidy. A block is closed by `end`.

```text
score = 90

if score >= 80
    say "Great!"
end
```

### Comments

A line that starts with `#` is a comment. A `#` after code also starts a comment. A `#` inside quotes is ordinary text.

```text
# This whole line is a comment
say "Hello"            # This part is a comment
say "Use # in text"    # The first # is part of the text
```

### Variables

Write a name, `=`, and a value. No keyword is needed. Assigning again replaces the old value.

```text
name = "Ana"
age = 21
age = age + 1
```

Rules for names:

- Use letters, digits, and underscores, for example `total_price`.
- Do not start a name with a digit.
- Do not use a keyword as a name (see [Keyword Summary](#keyword-summary)).

### Data Types

| Example | Type | Notes |
|---|---|---|
| `42` | Whole number | |
| `3.14` | Decimal number | |
| `"hello"` | Text | Always in double quotes |
| `yes` / `no` | True or false | Shown as `yes` and `no` when printed |
| `[1, 2, 3]` | List | Can hold any mix of values |

### Operators

Math:

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `+` | Add, or join text | `2 + 3` | `5` |
| `-` | Subtract | `10 - 4` | `6` |
| `*` | Multiply | `4 * 2` | `8` |
| `/` | Divide | `7 / 2` | `3.5` |

Comparison:

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `==` | Equal to | `5 == 5` | `yes` |
| `!=` | Not equal to | `5 != 3` | `yes` |
| `>` | Greater than | `5 > 3` | `yes` |
| `<` | Less than | `2 < 1` | `no` |
| `>=` | Greater than or equal | `5 >= 5` | `yes` |
| `<=` | Less than or equal | `4 <= 3` | `no` |

Logic:

| Word | Meaning | Example |
|---|---|---|
| `and` | Both must be true | `age >= 18 and age < 65` |
| `or` | At least one is true | `day == "Sat" or day == "Sun"` |
| `not` | Reverses a value | `not done` |

Use brackets to group math, for example `(2 + 3) * 4`.

### Text

Text goes inside double quotes. Join text with `+`.

```text
first = "Pl"
second = "-"
say first + second
say "Total: " + 25
```

Output:

```text
Pl-
Total: 25
```

Use `\"` to put a double quote inside text.

```text
say "She said \"hi\""
```

### Lists

A list uses square brackets. The first item is number `0`.

```text
fruits = ["apple", "banana", "mango"]
say fruits[0]
say fruits[2]
say len(fruits)
```

Output:

```text
apple
mango
3
```

Change an item by assigning to its position:

```text
fruits[1] = "orange"
say fruits
```

Output:

```text
["apple", "orange", "mango"]
```

### Decisions

Use `if` to run code only when something is true. Add `else if` for more checks and `else` for everything else. End with `end`.

```text
score = 72

if score >= 80
    say "Excellent"
else if score >= 60
    say "Good"
else
    say "Keep trying"
end
```

Output:

```text
Good
```

Combine checks with `and`, `or`, and `not`:

```text
age = 30
member = yes

if age >= 18 and member
    say "Welcome back"
end
```

### Loops

#### repeat

Run a block a fixed number of times.

```text
repeat 3
    say "Hi!"
end
```

#### while

Run a block as long as a condition is true.

```text
count = 3
while count > 0
    say count
    count = count - 1
end
say "Liftoff!"
```

Output:

```text
3
2
1
Liftoff!
```

Loops can be placed inside each other, and `if` can be placed inside a loop:

```text
n = 1
while n <= 5
    if n == 3
        say "Three!"
    else
        say n
    end
    n = n + 1
end
```

A safety limit stops a program after 200,000 loop steps, so a loop that never ends will show an error instead of freezing the page.

### Functions

A function is a named set of steps. Start it with `fn`, list its inputs after the name, and end it with `end`. Use `give` to send back a result.

```text
fn add a, b
    give a + b
end

say add(2, 3)
```

A function does not need inputs:

```text
fn hello
    say "Hello!"
end

hello()
```

A function can call other functions:

```text
fn double n
    give n * 2
end

fn quadruple n
    give double(double(n))
end

say quadruple(5)
```

Output:

```text
20
```

Naming tips: use small letters and underscores (`say_hi`), and give each function one clear job.

### Keyword Summary

| Keyword | Purpose |
|---|---|
| `say` | Show a value |
| `ask` | Ask the user a question |
| `if` / `else if` / `else` | Make decisions |
| `repeat` | Run a block a set number of times |
| `while` | Run a block while a condition is true |
| `fn` | Start a function |
| `give` | Return a result from a function |
| `end` | Close a block |
| `import` | Declare a module (optional in the Playground) |
| `and` / `or` / `not` | Combine conditions |
| `yes` / `no` | True and false |

## Built-in Commands

| Command | What it does | Example |
|---|---|---|
| `say value` | Shows a value on the screen | `say "Hi"` |
| `ask "text"` | Asks the user a question and returns the answer as text | `name = ask "Name? "` |
| `len(list)` | Counts the items in a list, or letters in text | `len(fruits)` |

Notes:

- `say` shows one value per line. Join several values with `+`.
- `ask` opens a small question box. The answer is always text, even when the user types a number.
- If the user cancels the question box, `ask` returns empty text.

```text
name = ask "What is your name? "
say "Nice to meet you, " + name
```

## Modules

Modules add extra abilities. They are ready to use in the Playground. A line such as `import game` is allowed and ignored, so you can write it for clarity.

### game

Draw shapes and make them move.

How it works: each call to `game.running()` saves the current drawing as one frame. When the program ends, the frames play back as an animation on a 400 by 300 canvas. A game stops after 300 frames.

| Function | What it does |
|---|---|
| `game.running()` | Saves a frame. Returns `yes` until 300 frames are saved, then `no` |
| `game.clear()` | Clears everything drawn in the current frame |
| `game.circle(x, y, r, color)` | Draws a filled circle with center `x`, `y` and radius `r` |
| `game.rect(x, y, w, h, color)` | Draws a filled rectangle with top-left corner `x`, `y` |
| `game.text(x, y, text, color)` | Draws text at `x`, `y` |

Colors can be names such as `"red"`, `"blue"`, `"green"`, or hex codes such as `"#8b5cf6"`.

Moving ball:

```text
x = 0
while game.running()
    game.clear()
    x = x + 4
    if x > 400
        x = 0
    end
    game.circle(x, 150, 20, "red")
end
```

Bouncing square with a label:

```text
x = 0
speed = 5
while game.running()
    game.clear()
    x = x + speed
    if x > 340
        speed = -5
    end
    if x < 0
        speed = 5
    end
    game.rect(x, 120, 60, 60, "#8b5cf6")
    game.text(10, 20, "Bounce!", "#1f2937")
end
```

### web

Build a web page and preview it.

How it works: `web.start(path, fn)` calls your function, takes the HTML text it gives back, and shows it in a preview frame. The preview is isolated, so scripts inside it do not run.

| Function | What it does |
|---|---|
| `web.start(path, fn)` | Runs `fn` and stores its HTML for `path`. The Playground previews `"/"` |

Hello page:

```text
fn home
    give "<h1 style='color:purple'>Hello!</h1>"
end

web.start("/", home)
```

Longer pages are built by joining pieces of text:

```text
head = "<html><head><meta charset='utf-8'><style>body{font-family:sans-serif;text-align:center}</style></head><body>"
title = "<h1>My Site</h1>"
body = "<p>Built with pl-.</p></body></html>"

page = head + title + body

fn home
    give page
end

web.start("/", home)
```

### ai

Learn a simple pattern from examples.

How it works: `ai.learn(xs, ys)` finds the straight line that best fits the pairs of inputs and answers. The result has a `guess(x)` function that predicts the answer for a new input, rounded to four decimal places.

| Function | What it does |
|---|---|
| `ai.learn(xs, ys)` | Learns a line from two lists of the same length |
| `model.guess(x)` | Predicts the answer for a new input `x` |

Doubling pattern:

```text
model = ai.learn([1, 2, 3], [2, 4, 6])
say model.guess(4)
say model.guess(10)
```

Output:

```text
8
20
```

Temperature example:

```text
celsius = [0, 10, 20, 30]
fahrenheit = [32, 50, 68, 86]

model = ai.learn(celsius, fahrenheit)
say model.guess(25)
```

Output:

```text
77
```

## Playground

The Playground runs pl- code inside the tutorial page.

| Control | What it does |
|---|---|
| **Run code** (sidebar) | Opens the Playground |
| **Run** | Translates and runs the code in the editor |
| **Clear output** | Clears the output panel, the game canvas, and the web preview |
| **Close** (X) | Closes the Playground |
| Ctrl+Enter | Runs the code (computer keyboard) |
| Esc | Closes the Playground |

The Playground has three output areas:

1. **Console.** Shows what `say` prints, plus errors.
2. **Canvas.** Shows the animation when a program uses `game`.
3. **Preview frame.** Shows the page when a program uses `web`.

## Example Programs

Calculator:

```text
a = 12
b = 4
say a + b
say a - b
say a * b
say a / b
```

Grade check:

```text
score = 72

if score >= 80
    say "Excellent!"
else if score >= 60
    say "Good, keep going."
else
    say "Study harder."
end
```

Countdown:

```text
count = 5
while count > 0
    say count
    count = count - 1
end
say "Go!"
```

Multiplication table:

```text
n = 1
while n <= 5
    say "3 x " + n + " = " + (3 * n)
    n = n + 1
end
```

Sum of a list:

```text
numbers = [4, 8, 15, 16, 23, 42]
total = 0
i = 0
while i < len(numbers)
    total = total + numbers[i]
    i = i + 1
end
say "Total: " + total
```

Greeting for everyone:

```text
fn greet name
    say "Hello, " + name
end

greet("Sari")
greet("Budi")
greet("Dewi")
```

## Error Messages

When something goes wrong, the console shows a red line that starts with `Error:`.

| Message | Likely cause |
|---|---|
| `Loop ran too long. Check your loop condition.` | A `while` loop never becomes false. Make sure the value in the condition changes |
| `... is not defined` | A variable or function is used before it is created, or the name is misspelled |
| `Unexpected token` or `Unexpected end of input` | A block is missing its `end`, or there is an extra `end` |
| `... is not a function` | A name was called with `()` but it is not a function |

If nothing happens, check that every `if`, `repeat`, `while`, and `fn` has a matching `end`.

## How the Translator Works

pl- code is translated into JavaScript one line at a time, then the JavaScript runs in the page.

1. Remove everything after `#` that is outside quotes.
2. Outside quotes, replace `yes`, `no`, `and`, `or`, and `not` with their JavaScript equivalents.
3. Turn each line into JavaScript:

| pl- | JavaScript |
|---|---|
| `say x` | `say(x);` |
| `name = ask "q"` | `var name = input("q");` |
| `x = 1` | `var x = 1;` |
| `if x > 1` | `if (x > 1) {` |
| `else if x > 0` | `} else if (x > 0) {` |
| `else` | `} else {` |
| `repeat 3` | `for (let i = 0; i < 3; i++) {` |
| `while x > 0` | `while (x > 0) {` |
| `fn add a, b` | `function add(a, b) {` |
| `give x` | `return x;` |
| `end` | `}` |

4. Run the result with the built-in `say`, `input`, `len`, `game`, `web`, and `ai` available.

Every loop and `if` line also calls a step counter. This is how the 200,000-step safety limit works.

Because the translator reads one line at a time, every block must end with `end`, and one instruction must fit on one line.

## Limitations

- `web` previews only the `/` page. There is no real server, no click events, and no form submission.
- `game` animations play back after the program finishes, not live. There is no keyboard or mouse input.
- `ai` fits only a straight line, so it suits simple examples.
- `ask` always returns text, and there is no built-in way to turn text into a number yet.
- There are no built-in list tools such as add or remove. Change a list by assigning to a position.
- The `%` operator and the words `true` and `false` are not supported. Use `yes` and `no`.
- Each instruction must fit on one line.
- Variables created inside a function or block may not be visible outside it.

## Tips for Beginners

- Start with `say`, then add one idea at a time.
- Write `end` right after you write `if`, `repeat`, `while`, or `fn`, then fill in the middle.
- Use clear names: `total_price` is better than `tp`.
- In a `while` loop, always change the value used in the condition.
- Test small pieces in the Playground before joining them into a bigger program.

## Roadmap

- Click events and forms for `web`
- Live keyboard and mouse input for `game`
- A number conversion command for `ask`
- List commands (add, remove, sort)
- The `%` operator and `true` / `false` support
- A `web` builder with commands such as `web.heading` and `web.text`, so pages need no HTML

## Contributing

Pull requests and issues are welcome. Please keep examples short and beginner-friendly, and test them in the Playground before submitting.

## License

© 2026 - LeonardoDaVorca X Aditdos
Mit License
