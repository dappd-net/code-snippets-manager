import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from 'renderer/graphql/queries';
import { GET_USER_RECIPES_VARIABLES } from 'renderer/graphql/variables';
import { AssistantRecipeWithStats } from 'renderer/types/assistantTypes';
import SnippetTableLoading from 'renderer/components/SnippetTable/SnippetTableLoading';
import SnippetTableError from 'renderer/components/SnippetTable/SnippetTableError';
import SnippetTableEmpty from 'renderer/components/SnippetTable/SnippetTableEmpty';
import SnippetTable from 'renderer/components/SnippetTable/SnippetTable';

export default function MySnippets() {
  const { data, loading, error } = useQuery<{
    user: { recipes: AssistantRecipeWithStats[] };
  }>(GET_USER_RECIPES, {
    variables: GET_USER_RECIPES_VARIABLES,
  });

  const userRecipes = data?.user?.recipes || [];

  if (error) {
    return <SnippetTableError />;
  }

  if (loading) {
    return <SnippetTableLoading />;
  }

  if (userRecipes.length === 0) {
    return <SnippetTableEmpty />;
  }

  return <SnippetTable recipes={userRecipes} />;
}
