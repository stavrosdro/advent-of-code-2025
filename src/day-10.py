import re
from ortools.linear_solver import pywraplp


def getFileData():
    with open("src/day-10.txt", "r", encoding="utf-8") as f:
        return f.read()


def getLines(fileData):
    return fileData.split("\n")


def parseGroups(s: str):
    return [
        [int(x) for x in group.split(',')]
        for group in re.findall(r'\((.*?)\)', s)
    ]


def solve_integer_system(left, right):
    N = len(left)
    M = len(left[0])
    solver = pywraplp.Solver.CreateSolver('SCIP')
    vars = [solver.IntVar(0, solver.infinity(), f'x{i}') for i in range(M)]
    for i in range(N):
        solver.Add(sum(left[i][j] * vars[j] for j in range(M)) == right[i])

    solver.Minimize(solver.Sum(vars))

    status = solver.Solve()
    if status == pywraplp.Solver.OPTIMAL:
        solution = [v.solution_value() for v in vars]
        return sum(solution)
    else:
        return None


wholeFile = getFileData()
rawLines = getLines(wholeFile)
rawLines = [s for s in rawLines if s != ""]

solver = pywraplp.Solver.CreateSolver('SCIP')
total = 0
for line in rawLines:
    left, right = line.split("]")[1].strip().split("{")
    left = parseGroups(left)
    right = right.split("}")[0].strip().split(",")
    right = [int(x) for x in right]
    state = []
    for button in left:
        arr = [0]*len(right)
        for number in button:
            arr[number] += 1
        state.append(arr)
    newState = []
    for i in range(len(right)):
        newState.append([])
    for i in range(len(newState)):
        for button in left:
            found = False
            for number in button:
                if (number == i):
                    found = True
            if (found):
                newState[i].append(1)
            else:
                newState[i].append(0)
    total += solve_integer_system(newState, right)

print(total)
