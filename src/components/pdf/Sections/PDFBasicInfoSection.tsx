import { View, Text, Image } from '@react-pdf/renderer';
import type { BasicInfo } from '../../../types/cv.types';

interface PDFBasicInfoSectionProps {
  basicInfo: BasicInfo;
  styles: any;
}

/**
 * PDF Basic Info Section - displays name, role, contact info and photo
 */
export function PDFBasicInfoSection({ basicInfo, styles }: PDFBasicInfoSectionProps) {
  return (
    <View style={styles.header}>
      <Text wrap style={styles.name}>
        {basicInfo.name}
      </Text>
      <Text wrap style={styles.role}>
        {basicInfo.role}
      </Text>

      {/* Contact Info */}
      <View style={styles.contactRow}>
        {basicInfo.email && (
          <Text wrap style={styles.contactItem}>
            {basicInfo.email}
          </Text>
        )}
        {basicInfo.phone && (
          <Text wrap style={styles.contactItem}>
            {basicInfo.phone}
          </Text>
        )}
        {basicInfo.location && (
          <Text wrap style={styles.contactItem}>
            {basicInfo.location}
          </Text>
        )}
        {basicInfo.website && (
          <Text wrap style={styles.contactItem}>
            {basicInfo.website}
          </Text>
        )}
        {basicInfo.github && (
          <Text wrap style={styles.contactItem}>
            {basicInfo.github}
          </Text>
        )}
        {basicInfo.linkedin && (
          <Text wrap style={styles.contactItem}>
            {basicInfo.linkedin}
          </Text>
        )}
      </View>

      {/* Photo if available */}
      {basicInfo.photo && (
        <View style={styles.photoContainer}>
          <Image src={basicInfo.photo} style={styles.photo} />
        </View>
      )}
    </View>
  );
}
