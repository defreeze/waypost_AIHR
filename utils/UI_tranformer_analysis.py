# https://github.com/microsoft/unilm/tree/master/layoutlmv3

# https://huggingface.co/microsoft/layoutlmv3-base/discussions/10

# https://github.com/NielsRogge/Transformers-Tutorials/blob/master/LayoutLMv3/Fine_tune_LayoutLMv3_on_FUNSD_(HuggingFace_Trainer).ipynb


from datasets import load_dataset 

# this dataset uses the new Image feature :)
dataset = load_dataset("nielsr/funsd-layoutlmv3")
#dataset["train"].features


example = dataset["train"][0]
example["image"]
