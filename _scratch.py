import re
from textwrap import wrap

re_doi = re.compile('(10[.][0-9]{2,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)');

def parse_message(tweet_string):
    resp_status, resp = False, {"doi": None, "intents": []}

    tweet_string = tweet_string.lower()
    
    tweet_doi = None
    if match := re_doi.search(tweet_string, re.IGNORECASE):
        tweet_doi = match.group(1)

    intent = []
    if any([ ptr in tweet_string for ptr in [ "who authored", "who is the author", "author" ] ]):
        intent.append("author_name")

    if any([ ptr in tweet_string for ptr in [ "when", "was" ] ]):
        intent.append("date")

    if any([ ptr in tweet_string for ptr in [ "refs", "references", "ref" ] ]):
        intent.append("reference")

    if any([ ptr in tweet_string for ptr in [ "citations", ] ]):
        intent.append("reference")

    if any([ ptr in tweet_string for ptr in [ "summary", ] ]):
        intent.append("summary")

    if any([ ptr in tweet_string for ptr in [ "retract", ] ]):
        intent.append("retraction")

    if tweet_doi:
        resp_status = True
        resp["doi"] = tweet_doi
        resp["intents"] = intent

    return resp_status, resp


def format_final_tweet(mentionat, doi, intents, publish_data):
    status, resp = False, {"tweets": []}

    resp_str = ""
    resp_str += f"Hey {mentionat}, here are the details for {doi}:\n"

    for intent in intents:
        if intent == "author_name":
            resp_str += f"Authors: {publish_data['intent']}.\n"
        
        elif intent == "date":
            resp_str += f"Publish Date: {publish_data['intent']}.\n"
        
        elif intent == "reference":
            resp_str += f"Reference Count: {publish_data['reference']}.\n"
        
        elif intent == "citation":
            resp_str += f"Citation Count: {publish_data['citation']}.\n"
        
        elif intent == "summary":
            resp_str += f"Summary: {publish_data['summary']}.\n"
        
        elif intent == "retraction":
            resp_str += f"Retraction Status: {publish_data['retraction']}.\n"
        
