package com.apb.getout.map;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.apb.getout.dto.ItemDto;
import com.apb.getout.entity.Item;



@Mapper(componentModel = "spring")
public interface ItemMapper {
	
    @Mapping(target = "imageData", source = "imageBase64", qualifiedByName = "base64ToBytes")
    Item toEntity(ItemDto dto);

    @Mapping(target = "imageBase64", source = "imageData", qualifiedByName = "bytesToBase64")
    ItemDto toDto(Item item);

    @Named("base64ToBytes")
    static byte[] base64ToBytes(String base64) {
        if (base64 == null || !base64.contains(",")) return null;
        base64 = base64.substring(base64.indexOf(",") + 1); // remove data:image/...;base64,
        return java.util.Base64.getDecoder().decode(base64);
    }

    @Named("bytesToBase64")
    static String bytesToBase64(byte[] data) {
        if (data == null) return null;
        return "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(data);
    }
    
    List<ItemDto> toDtoList(List<Item> items);
}
