### Penalize patterns

**(\d{3,})**

- \d means matches digit (0-9)
- {3,} means matches a sequence of three or more digits like 123, 4567, 0000

**([a-zA-Z]{3,})**

- [a-zA-Z]: This matches any alphabetical character, either lowercase (a-z) or uppercase (A-Z).
- {3,}: As before, this matches a sequence of three or more of the preceding character class. For example, it would match "aaa", "AbC", "zzzz", etc.

**(.)\1{2,}**

- (.): This matches any character (except line break characters) and captures it as a group. The dot . is a wildcard character in regex, matching any single character.
- \1: This is a back reference to the first capturing group (.). It matches the same character captured by the first group.
- {2,}: This means "two or more". Therefore, \1{2,} matches two or more of the same character that was captured by (.). For example, it would match "aaa", "111", but not "ab" or "1a2".

**|:**

- This is the alternation operator in regex, functioning like a logical OR. It allows the regex to match any one of the patterns specified on either side of the |. So the whole regex will match if any one of the three specified patterns is found in the string.

In summary, this regex pattern is used to penalize passwords that contain:

- A sequence of **_three or more of the same digit_** (like "111").
- A sequence of **_three or more of the same letter_**, either lowercase or uppercase (like "aaa").
- A sequence of **_three or more of any identical character_** (like "###").

---

**/.{9,}/**

- In regex, the dot . is a wildcard character that matches any single character, except for line breaks. It represents one instance of nearly any character.
- {9,}: This is a quantifier specifying that the preceding element (in this case, the . wildcard) **_must occur at least 9 times_**. The 9, syntax means "nine or more".
- So, **_.{9,}_** matches any sequence of **_at least 9 characters_**, regardless of what those characters are.
