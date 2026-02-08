#!/usr/bin/env python3
import sys

# Read the file
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace left and right double quotation marks with escaped quotes
content = content.replace('"', '\\"')  # U+201C
content = content.replace('"', '\\"')  # U+201D

# Write back
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed smart quotes in data.js")
