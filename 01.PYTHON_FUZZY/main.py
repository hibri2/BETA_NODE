import pandas as pd
from fuzzywuzzy import fuzz
from pathlib import Path, WindowsPath

myDSDir = WindowsPath(
    r"C:\00.HOME\00.INTERNAL\01.TASKS\29.GPO_CHECK_DUPLICATES\01.WIP\00.DS"
)
myOutDir = WindowsPath(
    r"C:\00.HOME\00.INTERNAL\01.TASKS\29.GPO_CHECK_DUPLICATES\01.WIP"
)
myDSFile = "00.SINGLE_DATASET_LIST_SUPPLIERS.xlsx"
myOutFile = "XX.MATCHED_SUPPLIERS.xlsx"
pandaInputFile = Path(myDSDir, myDSFile)
pandaOutputFile = Path(myOutDir, myOutFile)
df = pd.read_excel(pandaInputFile, sheet_name="VENDORS")
suppliersList = df["VENDOR_NAME"].tolist()


results = [[name, [], 0, [], 0, [], 0] for name in suppliersList]

for (i, supplier) in enumerate(suppliersList):
    for (j, matchCheck) in enumerate(suppliersList[i + 1 :]):
        ratio = fuzz.ratio(supplier, matchCheck)
        if ratio >= 90:
            results[i][2] += 1
            match = "| %s - RATIO: %s |" % (matchCheck, str(ratio))
            results[i][1].append(match)
        elif ratio >= 80:
            results[i][4] += 1
            match = "| %s - RATIO: %s |" % (matchCheck, str(ratio))
            results[i][3].append(match)
        elif ratio >= 70:
            results[i][6] += 1
            match = "| %s - RATIO: %s |" % (matchCheck, str(ratio))
            results[i][5].append(match)

data = pd.DataFrame(
    results,
    columns=[
        "name",
        "matches_at_ratio_90",
        "count",
        "matches_at_ratio_80",
        "count",
        "matches_at_ratio_70",
        "count",
    ],
)
data.to_excel(pandaOutputFile)
print("MATCHED FILE REPORT CREATED!")
