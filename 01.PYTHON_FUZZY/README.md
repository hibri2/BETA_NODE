# PYTHON FUZZY MATCH

This code will allow you to find approximate matches using fuzzy match in a single list of elements, it will iterate each element against the rest and provide a list of items with approximations and ratios, by default it will provide results for the following ratios: 90, 80 and 70.  this is configurable.

Do `pip install -r requirements.txt` to get all required packages.

Edit the main.py file with your parameters:

`myDSDir = WindowsPath(r YOUR DATASOURCE DIRECTORY)`

`myOutDir = WindowsPath(r YOUR OUTPUT DIRECTORY)`

`myDSFile = "YOUR DATASOURCE FILE (EXCEL)"`

`myOutFile = "YOUR OUTPUT FILE (EXCEL)"`

`df = pd.read_excel(pandaInputFile, sheet_name="YOUR SHEET")`