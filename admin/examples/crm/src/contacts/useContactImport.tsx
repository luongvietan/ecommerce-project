import { useCallback, useMemo } from 'react';
import { useDataProvider, useGetIdentity } from 'react-admin';
import { Company, Tag } from '../types';

export type ContactImportSchema = {
    first_name: string;
    last_name: string;
    gender: string;
    title: string;
    company: string;
    email: string;
    phone_1_number: string;
    phone_1_type: string;
    phone_2_number: string;
    phone_2_type: string;
    background: string;
    avatar: string;
    first_seen: string;
    last_seen: string;
    has_newsletter: string;
    status: string;
    tags: string;
    linkedin_url: string;
};

export function useContactImport() {
    const user = useGetIdentity();
    const dataProvider = useDataProvider();

    // Sales cache to avoid creating the same tag multiple times and costly roundtrips
    // Cache is dependent of dataProvider, so it's safe to use it as a dependency
    const companiesCache = useMemo(
        () => new Map<string, Company>(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dataProvider]
    );

    const _cacheFetchBatch = useCallback(
        async function <T>(
            entity: string,
            cache: Map<string, T>,
            names: string[],
            getCreateData: (name: string) => Partial<T>
        ) {
            const trimmedNames = [...new Set(names.map(name => name.trim()))];
            const uncachedEntities = trimmedNames.filter(
                name => !cache.has(name)
            );

            const entities = uncachedEntities.length
                ? await dataProvider.getList(entity, {
                      filter: {
                          'name@in': `(${uncachedEntities.map(entity => `"${entity}"`).join(',')})`,
                      },
                      pagination: { page: 1, perPage: trimmedNames.length },
                      sort: { field: 'id', order: 'ASC' },
                  })
                : { data: [] };

            for (const entity of entities.data) {
                cache.set(entity.name.trim(), entity);
            }

            await Promise.all(
                uncachedEntities.map(async name => {
                    if (!cache.has(name)) {
                        const createdEntity = await dataProvider.create(
                            entity,
                            {
                                data: getCreateData(name),
                            }
                        );
                        cache.set(name, createdEntity.data);
                    }
                    return Promise.resolve();
                })
            );

            return trimmedNames.reduce((acc, name) => {
                acc.set(name, cache.get(name) as T);
                return acc;
            }, new Map<string, T>());
        },
        [dataProvider]
    );

    const getCompanies = useCallback(
        async (names: string[]) => {
            return _cacheFetchBatch<Company>(
                'companies',
                companiesCache,
                names,
                name => ({
                    name,
                    created_at: new Date().toISOString(),
                    sales_id: user?.identity?.id,
                })
            );
        },
        [_cacheFetchBatch, companiesCache, user?.identity?.id]
    );

    // Tags cache to avoid creating the same tag multiple times and costly roundtrips
    // Cache is dependent of dataProvider, so it's safe to use it as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const tagsCache = useMemo(() => new Map<string, Tag>(), [dataProvider]);

    const getTags = useCallback(
        async (names: string[]) => {
            return _cacheFetchBatch<Tag>('tags', tagsCache, names, name => ({
                name,
                color: '#f9f9f9',
            }));
        },
        [_cacheFetchBatch, tagsCache]
    );

    const parseTags = useCallback((tags: string) => {
        return (
            tags
                ?.split(',')
                ?.map((tag: string) => tag.trim())
                ?.filter((tag: string) => tag) ?? []
        );
    }, []);

    const processBatch = useCallback(
        async (batch: ContactImportSchema[]) => {
            const [companies, tags] = await Promise.all([
                getCompanies(batch.map(contact => contact.company.trim())),
                getTags(batch.flatMap(batch => parseTags(batch.tags))),
            ]);

            await Promise.all(
                batch.map(
                    async ({
                        first_name,
                        last_name,
                        gender,
                        title,
                        email,
                        phone_1_number,
                        phone_1_type,
                        phone_2_number,
                        phone_2_type,
                        background,
                        first_seen,
                        last_seen,
                        has_newsletter,
                        status,
                        company: companyName,
                        tags: tagNames,
                        linkedin_url,
                    }) => {
                        const company = companies.get(companyName.trim());
                        const tagList = parseTags(tagNames)
                            .map(name => tags.get(name))
                            .filter((tag): tag is Tag => !!tag);

                        // This should not happen, but we silently fail in case of error
                        // TODO: warn user about missing company
                        if (!company) {
                            return;
                        }

                        return dataProvider.create('contacts', {
                            data: {
                                first_name,
                                last_name,
                                gender,
                                title,
                                email,
                                phone_1_number,
                                phone_1_type,
                                phone_2_number,
                                phone_2_type,
                                background,
                                first_seen: first_seen
                                    ? new Date(first_seen).toISOString()
                                    : undefined,
                                last_seen: last_seen
                                    ? new Date(last_seen).toISOString()
                                    : undefined,
                                has_newsletter,
                                status,
                                company_id: company.id,
                                tags: tagList.map(tag => tag.id),
                                sales_id: user?.identity?.id,
                                linkedin_url,
                            },
                        });
                    }
                )
            );
        },
        [dataProvider, getCompanies, parseTags, getTags, user?.identity?.id]
    );

    return {
        processBatch,
    };
}
