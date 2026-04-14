import re

with open('src/screens/RoutePlanning.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

depth = 0
for i, line in enumerate(lines):
    if i < 216: continue
    
    # exclude commented out code
    if '{/*' in line and '*/}' in line and '<div' not in line[:line.find('{/*')]:
        pass
    
    # naive count of <div and </div
    # wait, comments might contain <div
    clean_line = re.sub(r'\{/\*.*?\*/\}', '', line)
    
    opens = len(re.findall(r'<div[^>]*>', clean_line)) + len(re.findall(r'<div\s*$', clean_line)) + len(re.findall(r'<div\s+', clean_line))
    # more reliable: count '<div'
    opens = clean_line.count('<div')
    closes = clean_line.count('</div')
    
    depth += opens
    depth -= closes
    
    if '</main>' in line:
        print(f"Line {i+1}: </main> encountered. Depth: {depth}")
        break

    if opens > 0 or closes > 0:
        # print(f"Line {i+1}: +{opens} -{closes} -> Depth {depth} | {clean_line.strip()[:60]}")
        pass
        
    if depth < 0:
        print(f"!!! EXTRA CLOSING DIV AT LINE {i+1} !!!")
        print(f"Line content: {line.strip()}")
        break
        
print("Final Depth before main closes:", depth)
