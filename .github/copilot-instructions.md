
# PROJECT RULES - TOKEN EFFICIENCY

## General
- Keep responses short and technical.
- Minimize context usage.
- Never analyze the entire repository unless requested.
- Inspect only files relevant to the task.
- Avoid repeating previous explanations.
- Do not generate unnecessary documentation.

## Before coding
- Identify the exact problem.
- Inspect the relevant component, service or function.
- Check existing patterns before creating new ones.
- Do not explore unrelated modules.

## Code modifications
- Make the smallest possible change.
- Modify only necessary files.
- Do not refactor unrelated code.
- Reuse existing components, hooks, services and utilities.
- Preserve current architecture.
- Do not install dependencies unless necessary.

## Agent execution
- Do not create subagents unless explicitly requested.
- Avoid repeated searches.
- Do not run the entire test suite for a small change.
- Run only relevant tests.
- Do not repeat successful commands.
- Stop when acceptance criteria are met.
- Do not automatically fix unrelated warnings.

## Output
- Summarize modified files.
- Explain only important changes.
- Show errors only when relevant.
- Avoid printing entire files.
- Do not provide multiple alternatives unless requested.

## Priority
Correctness first.
Minimum changes second.
Minimum context and AI credits third.
