name = ask "Hi! What is your name?"
say "Nice to meet you, " + name + "!"

mood = ask "How are you today? (good / bad)"
if mood == "good"
    say "Great! Keep smiling."
else if mood == "bad"
    say "I am sorry to hear that. Tomorrow will be better."
else
    say "Thanks for sharing."
end

food = ask "What is your favorite food?"
say food + " sounds delicious!"

age = ask "How old are you?"
say "Wow, " + age + " is a great age to learn pl-!"
say "Goodbye, " + name + "!"
