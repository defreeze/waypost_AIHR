import os
import json


def load_json_files(directory_path):
    """
    Load JSON data from all files in the specified directory.

    Parameters:
    directory_path (str): The path to the directory containing JSON files.

    Returns:
    dict: A dictionary containing data from all JSON files.
    """
    # List all files in the directory
    file_list = os.listdir(directory_path)

    # Initialize an empty dictionary to store data from all JSON files
    all_data = {}

    # Loop through each file and load the JSON data
    for file_name in file_list:
        # Check if the file has a .json extension
        if file_name.endswith(".json"):
            file_path = os.path.join(directory_path, file_name)
            with open(file_path, "r") as json_file:
                data = json.load(json_file)
                all_data.update(data)

    return all_data
