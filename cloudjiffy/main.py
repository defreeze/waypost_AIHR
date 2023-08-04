from json_loader import load_json_files
from pinecone_utils import store_embeddings_in_pinecone


if __name__ == "__main__":
    # Step 1: Load JSON data from all files in the specified directory
    directory_path = "C:/Users/alexd/Documents/genius+/waypost.ai to MVP/cloudjiffly"
    all_data = load_json_files(directory_path)

    # Step 2: Process the JSON data (e.g., generate embeddings and store them in Pinecone)
    openai_api_key = "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"
    pinecone_api_key = "bb625a20-105e-4675-a446-5877a8decb16"

    # Step 3: Store embeddings in Pinecone
    store_embeddings_in_pinecone(all_data, openai_api_key, pinecone_api_key)
