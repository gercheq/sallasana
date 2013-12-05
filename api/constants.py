__author__ = 'Renan Cakirerk <renan@cakirerk.org>'

# Whenever we change the facade we should set this to true
# TODO: Renan this gradually does the job, as the users get recommendations.
# Find a way to be sure that everyone's stuff is reset.
RESET_RECOMMENDATION_VIEWS_CACHE = True

# How many users should be sought on each search
SEARCH_WINDOW = 20

# How many recommendations should be returned
MAX_RECOMMENDATIONS = SEARCH_WINDOW