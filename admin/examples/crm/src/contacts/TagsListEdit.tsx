import * as React from 'react';
import { useState, FormEvent } from 'react';
import {
    useGetMany,
    useCreate,
    useUpdate,
    useGetList,
    Identifier,
    useRecordContext,
    Toolbar,
} from 'react-admin';
import {
    Chip,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Menu,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';

import { colors } from '../tags/colors';
import { Contact, Tag } from '../types';
import { DialogCloseButton } from '../misc/DialogCloseButton';
import ContentSave from '@mui/icons-material/Save';

export const TagsListEdit = () => {
    const record = useRecordContext<Contact>();
    const [open, setOpen] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState(colors[0]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [disabled, setDisabled] = useState(false);

    const { data: allTags, isPending: isPendingAllTags } = useGetList<Tag>(
        'tags',
        {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'name', order: 'ASC' },
        }
    );
    const { data: tags, isPending: isPendingRecordTags } = useGetMany<Tag>(
        'tags',
        { ids: record?.tags },
        { enabled: record && record.tags && record.tags.length > 0 }
    );
    const [update] = useUpdate<Contact>();
    const [create] = useCreate<Tag>();

    const unselectedTags =
        allTags &&
        record &&
        allTags.filter(tag => !record.tags.includes(tag.id));

    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteTag = (id: Identifier) => {
        if (!record) {
            throw new Error('No contact record found');
        }
        const tags = record.tags.filter(tagId => tagId !== id);
        update('contacts', {
            id: record.id,
            data: { tags },
            previousData: record,
        });
    };

    const handleAddTag = (id: Identifier) => {
        if (!record) {
            throw new Error('No contact record found');
        }
        const tags = [...record.tags, id];
        update('contacts', {
            id: record.id,
            data: { tags },
            previousData: record,
        });
        setAnchorEl(null);
    };

    const handleOpenCreateDialog = () => {
        setOpen(true);
        setAnchorEl(null);
        setDisabled(false);
    };

    const handleNewTagNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewTagName(event.target.value);
    };

    const handleCreateTag = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!record) {
            throw new Error('No contact record found');
        }
        setDisabled(true);
        create(
            'tags',
            { data: { name: newTagName, color: newTagColor } },
            {
                onSuccess: tag => {
                    update(
                        'contacts',
                        {
                            id: record.id,
                            data: { tags: [...record.tags, tag.id] },
                            previousData: record,
                        },
                        {
                            onSuccess: () => {
                                setNewTagName('');
                                setNewTagColor(colors[0]);
                                setOpen(false);
                            },
                        }
                    );
                },
            }
        );
    };

    if (isPendingRecordTags || isPendingAllTags) return null;
    return (
        <>
            {tags?.map(tag => (
                <Box mt={1} mb={1} key={tag.id}>
                    <Chip
                        size="small"
                        variant="outlined"
                        onDelete={() => handleDeleteTag(tag.id)}
                        label={tag.name}
                        style={{ backgroundColor: tag.color, border: 0 }}
                    />
                </Box>
            ))}
            <Box mt={1}>
                <Chip
                    icon={<ControlPointIcon />}
                    size="small"
                    variant="outlined"
                    onClick={handleOpen}
                    label="Add tag"
                    color="primary"
                />
            </Box>
            <Menu
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                {unselectedTags?.map(tag => (
                    <MenuItem key={tag.id} onClick={() => handleAddTag(tag.id)}>
                        <Chip
                            size="small"
                            variant="outlined"
                            label={tag.name}
                            style={{
                                backgroundColor: tag.color,
                                border: 0,
                            }}
                            onClick={() => handleAddTag(tag.id)}
                        />
                    </MenuItem>
                ))}
                <MenuItem onClick={handleOpenCreateDialog}>
                    <Chip
                        icon={<EditIcon />}
                        size="small"
                        variant="outlined"
                        onClick={handleOpenCreateDialog}
                        color="primary"
                        label="Create new tag"
                    />
                </MenuItem>
            </Menu>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={handleCreateTag}>
                    <DialogCloseButton onClose={() => setOpen(false)} />
                    <DialogTitle id="form-dialog-title">
                        Create a new tag
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            label="Tag name"
                            value={newTagName}
                            onChange={handleNewTagNameChange}
                            sx={{ mt: 1 }}
                        />
                        <Box display="flex" flexWrap="wrap" width={230} mt={2}>
                            {colors.map(color => (
                                <RoundButton
                                    key={color}
                                    color={color}
                                    selected={color === newTagColor}
                                    handleClick={() => {
                                        setNewTagColor(color);
                                    }}
                                />
                            ))}
                        </Box>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            justifyContent: 'flex-start',
                            p: 0,
                        }}
                    >
                        <Toolbar
                            sx={{
                                width: '100%',
                            }}
                        >
                            <Button
                                type="submit"
                                color="primary"
                                disabled={disabled}
                                variant="contained"
                                startIcon={<ContentSave />}
                            >
                                Save
                            </Button>
                        </Toolbar>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

const RoundButton = ({ color, handleClick, selected }: any) => (
    <Box
        component="button"
        type="button"
        sx={{
            bgcolor: color,
            width: 30,
            height: 30,
            borderRadius: 15,
            border: selected ? '2px solid grey' : 'none',
            display: 'inline-block',
            margin: 1,
        }}
        onClick={handleClick}
    />
);
