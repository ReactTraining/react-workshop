# Footguns

Looks like we have a problem with out `useRecordData` hook!

We are trying to load some data for each page in our app from our API when we navigate to that page. This seems to work, but the problem is that we are hitting the API more than we expected. Now the cost of running our very fancy cloud-based backend is through the roof and our shareholders are very upset. Business!

We need to get to the root of the problem. We only want to fetch new data when our `pathname` changes. For very important performance reasons we want to be careful about resetting our data state in the hook if it's already empty, so we need to check to make sure it actually needs to be reset before we do the rest of the work.

Can you fix our app to make sure we're only fetching when the location changes?

## Hints

1. A code smell for me: when someone is tracking a previous value vs. a current value manually in a hook instead of relying on the dependency array. Sometimes you need to do that, but this is a case where I can usually find a simpler way to refactor things to avoid that comparison, which is easy to mess up because of bad syncronization somewhere.
