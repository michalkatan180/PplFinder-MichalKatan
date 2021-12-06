import React, { useEffect, useState } from "react";
import * as S from "./style";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
const FavoriteUsers = ({ users, isLoading }) => {


    useEffect(() => {
        if (!localStorage.getItem("favorites")) localStorage.setItem("favorites", JSON.stringify([]));
        setFavorites(JSON.parse(localStorage.getItem("favorites")));
    }, []);

    const [favorites, setFavorites] = useState([]);

    return (
        <S.Content>
            <S.Header><Text size="36px" bold>Favorite Users</Text></S.Header>
            <S.UserList>
                <S.List>
                    {users && users.map((user, index) => {
                        if (favorites && favorites.findIndex(f => f === user.login.uuid) > -1)
                            return (
                                <S.User key={index}>
                                    <S.UserPicture src={user?.picture.large} alt="" />
                                    <S.UserInfo>
                                        <Text size="22px" bold>
                                            {user?.name.title} {user?.name.first} {user?.name.last}
                                        </Text>
                                        <Text size="14px">{user?.email}</Text>
                                        <Text size="14px">
                                            {user?.location.street.number} {user?.location.street.name}
                                        </Text>
                                        <Text size="14px">
                                            {user?.location.city} {user?.location.country}
                                        </Text>
                                    </S.UserInfo>
                                    <S.IconButtonWrapper
                                        isVisible={true}
                                        onClick={() => {
                                            let arr = JSON.parse(localStorage.getItem("favorites"));
                                            let ind = arr.indexOf(user.login.uuid);
                                            if (ind == -1) arr.push(user.login.uuid)
                                            else arr.splice(ind, 1);
                                            localStorage.setItem("favorites", JSON.stringify(arr));
                                            setFavorites(arr);
                                        }}>
                                        <IconButton>
                                            <FavoriteIcon color='error' />
                                        </IconButton>
                                    </S.IconButtonWrapper>
                                </S.User>
                            );
                    })}
                    {isLoading && (
                        <S.SpinnerWrapper>
                            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
                        </S.SpinnerWrapper>
                    )}
                </S.List>
            </S.UserList>
        </S.Content>
    );
};

export default FavoriteUsers;
